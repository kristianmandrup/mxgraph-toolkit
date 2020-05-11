import mx from "mx";
const { mxEditor, mxResources, mxEvent, mxClient, mxDivResizer } = mx

export class Statusbar {
  editor: any
  status: any
  proto: any = mxEditor.prototype

  constructor(editor: any) {
    this.editor = editor
  }

  init() {
    this.proto.setStatusContainer = this.setStatusContainer
    return this
  }

  setStatusContainer = (container) => {
    const { proto } = this
    if (this.status == null)
    {
      this.status = container;
  
      // Prints the last saved time in the status bar
      // when files are saved
      proto.addListener(mxEvent.SAVE, () => {
        const { lastSavedResource } = proto
        var tstamp = new Date().toLocaleString();
        proto.setStatus((mxResources.get(lastSavedResource) ||
          lastSavedResource)+ ': ' +tstamp);
      });
  
      // Updates the statusbar to display the filename
      // when new files are opened
      proto.addListener(mxEvent.OPEN, () => {
        const { currentFileResource } = proto
        proto.setStatus((mxResources.get(currentFileResource) ||
        currentFileResource)+': '+ proto.filename);
      });  
    }
  };  
}