export class HelpActions {
  showingAbout: boolean = false;

  help() {
    // Help actions
    this.addAction('help', () => {
      var ext = '';
      
      if (mxResources.isLanguageSupported(mxClient.language))
      {
        ext = '_' + mxClient.language;
      }
      
      graph.openLink(RESOURCES_PATH + '/help' + ext + '.html');
    });
  }
		
	about() {
    this.put('about', new Action(mxResources.get('about') + ' Graph Editor...', () => {
      if (showingAbout) return

      ui.showDialog(new AboutDialog(ui).container, 320, 280, true, true, function()
      {
        showingAbout = false;
      });
      
      showingAbout = true;
    }));
  }
}