import { AgGridCellPosition } from "../e2e/ascend/interfaces/AgGridCellPositionInterface";

export type AgGridColumn = {
  id: string;
  valueParser?: (cell: Element) => string | number;
  comparator?: (a: string | number, b: string | number) => number;
}

export const cellsToObjects = (valueParser: (cell: Element) => string | number) => {
  return ($cells: JQuery<Element>): Array<AgGridCellPosition> => {
    return $cells.map((index, cell$) => {
      let value: string | number;
      if (valueParser) {
        value = valueParser(cell$);
      } else {
        value = cell$.textContent.trim();
      }
      return {
        value,
        rowIndex: Number(cell$.parentElement.attributes['row-index'].value),
      }
    }).get().sort((a, b) => a.rowIndex - b.rowIndex);
  }
}
