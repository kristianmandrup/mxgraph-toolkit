class DeleteCells {
  graph: any

  execute(includeEdges) {
    const { graph } = this
    // Cancels interactive operations
    graph.escape();
    const cells = graph.getDeletableCells(graph.getSelectionCells());
    const model = graph.model

    if (cells && cells.length > 0) {
      var parents = (graph.selectParentAfterDelete) ? model.getParents(cells) : null;
      graph.removeCells(cells, includeEdges);
      
      // Selects parents for easier editing of groups
      if (parents) {
        const select = [];        
        for (var i = 0; i < parents.length; i++) {
          const cell = parents[i]
          const modelHasParent = model.contains(cell) && (model.isVertex(cell) || model.isEdge(cell))
          if (modelHasParent) {
            this.addCell(select, cell)
          }
        }        
        graph.setSelectionCells(select);
      }
    }
  }

  addCell(select, cell) {
    select.push('cell');
  }
}
