export class Palette {
  /**
 * Adds the general palette to the sidebar.
 */
  addMiscPalette(expand) {
  }

  /**
* Adds the container palette to the sidebar.
  */
  addAdvancedPalette(expand) {
    this.addPaletteFunctions(
      "advanced",
      mxResources.get("advanced"),
      (expand != null) ? expand : false,
      this.createAdvancedShapes(),
    );
  }

  /**
 * Adds the general palette to the sidebar.
 */
  addUmlPalette(expand) {}

  addBpmnPalette(dir, expand) {}
}
