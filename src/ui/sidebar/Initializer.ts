export class SidebarInitializer {
  editorUi: any;
  graph: any;
  container: any;
  palettes = new Object();
  taglist = new Object();
  showTooltips = true;
  pointerUpHandler: any;
  pointerDownHandler: any;
  thread: any;
  currentElt: any;
  tooltip: any;
  tooltipTitle: any;
  graph2: any;
  roundDrop: any;
  triangleDown: any;
  currentSearch: any;
  entries: any;

  constructor() {}

  /**
   * Adds all palettes to the sidebar.
   */
  init() {
    var dir = STENCIL_PATH;

    this.addSearchPalette(true);
    this.addGeneralPalette(true);
    this.addMiscPalette(false);
    this.addAdvancedPalette(false);
    this.addBasicPalette(dir);
    this.addStencilPalette(
      "arrows",
      mxResources.get("arrows"),
      dir + "/arrows.xml",
      ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2",
    );
    this.addUmlPalette(false);
    this.addBpmnPalette(dir, false);
    this.addStencilPalette(
      "flowchart",
      "Flowchart",
      dir + "/flowchart.xml",
      ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2",
    );
    this.addImagePalette(
      "clipart",
      mxResources.get("clipart"),
      dir + "/clipart/",
      "_128x128.png",
      [
        "Earth_globe",
        "Empty_Folder",
        "Full_Folder",
        "Gear",
        "Lock",
        "Software",
        "Virus",
        "Email",
        "Database",
        "Router_Icon",
        "iPad",
        "iMac",
        "Laptop",
        "MacBook",
        "Monitor_Tower",
        "Printer",
        "Server_Tower",
        "Workstation",
        "Firewall_02",
        "Wireless_Router_N",
        "Credit_Card",
        "Piggy_Bank",
        "Graph",
        "Safe",
        "Shopping_Cart",
        "Suit1",
        "Suit2",
        "Suit3",
        "Pilot1",
        "Worker1",
        "Soldier1",
        "Doctor1",
        "Tech1",
        "Security1",
        "Telesales1",
      ],
      null,
      {
        "Wireless_Router_N":
          "wireless router switch wap wifi access point wlan",
        "Router_Icon": "router switch",
      },
    );
  }

  configure() {
    /*
    * Experimental smaller sidebar entries
    */
    if (urlParams["sidebar-entries"] != "large") {
      this.thumbPadding = (this.documentMode >= 5) ? 0 : 1;
      this.thumbBorder = 1;
      this.thumbWidth = 32;
      this.thumbHeight = 30;
      this.minThumbStrokeWidth = 1.3;
      this.thumbAntiAlias = true;
    }
  }
}
