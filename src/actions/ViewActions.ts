import mx from "mx";
const { mxUtils } = mx

const Editor: any = {}

export class ViewActions {
  graph: any
  ui: any

  addAction(label: string, fn, x?, y?, z?) {
  }

  get(x:any) {

  }

  resetView() {
    const { ui, graph } = this
    // View actions
    this.addAction('resetView', () =>
    {
      graph.zoomTo(1);
      ui.resetScrollbars();
    }, null, null, Editor.ctrlKey + '+H');
  }

  zoomIn() {
    const { ui, graph } = this
    this.addAction('zoomIn', function(evt)
    {
      if (graph.isFastZoomEnabled())
      {
        graph.lazyZoom(true, true, ui.buttonZoomDelay);
      }
      else
      {
        graph.zoomIn();
      }
    }, null, null, Editor.ctrlKey + ' + (Numpad) / Alt+Mousewheel');    
  }

  zoomOut() {
    const { ui, graph } = this
    this.addAction('zoomOut', (evt) => {
      if (graph.isFastZoomEnabled()) {
        graph.lazyZoom(false, true, ui.buttonZoomDelay);
      }
      else {
        graph.zoomOut();
      }
    }, null, null, Editor.ctrlKey + ' - (Numpad) / Alt+Mousewheel');
  }

fitWindow(){
  const { graph } = this
	this.addAction('fitWindow', () => {
		var bounds = (graph.isSelectionEmpty()) ? graph.getGraphBounds() : graph.getBoundingBox(graph.getSelectionCells());
		var t = graph.view.translate;
		var s = graph.view.scale;
		bounds.width /= s;
		bounds.height /= s;
		bounds.x = bounds.x / s - t.x;
		bounds.y = bounds.y / s - t.y;
		
		var cw = graph.container.clientWidth - 10;
		var ch = graph.container.clientHeight - 10;
		var scale = Math.floor(20 * Math.min(cw / bounds.width, ch / bounds.height)) / 20;
		graph.zoomTo(scale);

		if (mxUtils.hasScrollbars(graph.container))
		{
			graph.container.scrollTop = (bounds.y + t.y) * scale -
				Math.max((ch - bounds.height * scale) / 2 + 5, 0);
			graph.container.scrollLeft = (bounds.x + t.x) * scale -
				Math.max((cw - bounds.width * scale) / 2 + 5, 0);
		}
  }, null, null, Editor.ctrlKey + '+Shift+H');
}

  fitPage() {
    const { graph } = this
    this.addAction('fitPage', () => {
      if (!graph.pageVisible) {
        this.get('pageView').funct();
      }
      
      var fmt = graph.pageFormat;
      var ps = graph.pageScale;
      var cw = graph.container.clientWidth - 10;
      var ch = graph.container.clientHeight - 10;
      var scale = Math.floor(20 * Math.min(cw / fmt.width / ps, ch / fmt.height / ps)) / 20;
      graph.zoomTo(scale);
      
      if (mxUtils.hasScrollbars(graph.container))
      {
        var pad = graph.getPagePadding();
        graph.container.scrollTop = pad.y * graph.view.scale - 1;
        graph.container.scrollLeft = Math.min(pad.x * graph.view.scale, (graph.container.scrollWidth - graph.container.clientWidth) / 2) - 1;
      }
    }), null, null, Editor.ctrlKey + '+J');
  }  

  fitTwoPages() {
    this.addAction('fitTwoPages', mxUtils.bind(this, function()
    {
      if (!graph.pageVisible)
      {
        this.get('pageView').funct();
      }
      
      var fmt = graph.pageFormat;
      var ps = graph.pageScale;
      var cw = graph.container.clientWidth - 10;
      var ch = graph.container.clientHeight - 10;
      
      var scale = Math.floor(20 * Math.min(cw / (2 * fmt.width) / ps, ch / fmt.height / ps)) / 20;
      graph.zoomTo(scale);
      
      if (mxUtils.hasScrollbars(graph.container))
      {
        var pad = graph.getPagePadding();
        graph.container.scrollTop = Math.min(pad.y, (graph.container.scrollHeight - graph.container.clientHeight) / 2);
        graph.container.scrollLeft = Math.min(pad.x, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
      }
    }), null, null, Editor.ctrlKey + '+Shift+J');
  }

  fitPageWidth() {
    this.addAction('fitPageWidth', mxUtils.bind(this, function()
    {
      if (!graph.pageVisible)
      {
        this.get('pageView').funct();
      }
      
      var fmt = graph.pageFormat;
      var ps = graph.pageScale;
      var cw = graph.container.clientWidth - 10;

      var scale = Math.floor(20 * cw / fmt.width / ps) / 20;
      graph.zoomTo(scale);
      
      if (mxUtils.hasScrollbars(graph.container))
      {
        var pad = graph.getPagePadding();
        graph.container.scrollLeft = Math.min(pad.x * graph.view.scale,
          (graph.container.scrollWidth - graph.container.clientWidth) / 2);
      }
    }));
  }

  customZoom() {
    this.put('customZoom', new Action(mxResources.get('custom') + '...', mxUtils.bind(this, function()
    {
      var dlg = new FilenameDialog(this.editorUi, parseInt(graph.getView().getScale() * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
      {
        var val = parseInt(newValue);
        
        if (!isNaN(val) && val > 0)
        {
          graph.zoomTo(val / 100);
        }
      }), mxResources.get('zoom') + ' (%)');
      this.editorUi.showDialog(dlg.container, 300, 80, true, true);
      dlg.init();
    }), null, null, Editor.ctrlKey + '+0'));
  }

  pageScale() {
    this.addAction('pageScale...', () => {
      var dlg = new FilenameDialog(this.editorUi, parseInt(graph.pageScale * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
      {
        var val = parseInt(newValue);
        
        if (!isNaN(val) && val > 0)
        {
          var change = new ChangePageSetup(ui, null, null, null, val / 100);
          change.ignoreColor = true;
          change.ignoreImage = true;
          
          graph.model.execute(change);
        }
      }), mxResources.get('pageScale') + ' (%)');
      this.editorUi.showDialog(dlg.container, 300, 80, true, true);
      dlg.init();
    })
  }
}