export class ImagePalette {
  /**
 * Adds the given image palette.
 */
  addImagePalette(id, title, prefix, postfix, items, titles, tags) {
    var showTitles = titles != null;
    var fns = [];

    for (var i = 0; i < items.length; i++) {
      (mxUtils.bind(this, function (item, title, tmpTags) {
        if (tmpTags == null) {
          var slash = item.lastIndexOf("/");
          var dot = item.lastIndexOf(".");
          tmpTags = item.substring(
            (slash >= 0) ? slash + 1 : 0,
            (dot >= 0) ? dot : item.length,
          ).replace(/[-_]/g, " ");
        }

        fns.push(
          this.createVertexTemplateEntry(
            "image;html=1;labelBackgroundColor=#ffffff;image=" + prefix + item +
              postfix,
            this.defaultImageWidth,
            this.defaultImageHeight,
            "",
            title,
            title != null,
            null,
            this.filterTags(tmpTags),
          ),
        );
      }))(
        items[i],
        (titles != null) ? titles[i] : null,
        (tags != null) ? tags[items[i]] : null,
      );
    }

    this.addPaletteFunctions(id, title, false, fns);
  }
}
