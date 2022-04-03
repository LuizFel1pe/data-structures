import { Compare, defaultCompare } from '../utils/index.js';
import LinkedList from './linkedList.js';

// export default class SortedLinkedList extends LinkedList {
//   constructor(compareFn = defaultCompare) {
//     super();
//     this.compareFn = compareFn;
//   }

//   push(element) {
//     if (this.isEmpty()) {
//       super.push(element);
//     } else {
//       const index = this.getIndexNextSortedElement(element);
//       super.insert(element, index);
//     }
//   }

//   insert(element, index = 0) {
//     if (this.isEmpty()) {
//       return super.insert(element, index === 0 ? index : 0);
//     }
//     const pos = this.getIndexNextSortedElement(element);
//     return super.insert(element, pos);
//   }

//   getIndexNextSortedElement(element) {
//     let current = this.head;
//     let i = 0;
//     for (; i < this.size() && current; i++) {
//       const comp = this.compareFn(element, current.element);
//       if (comp === Compare.LESS_THAN) {
//         return i;
//       }
//       current = current.next;
//     }
//     return i;
//   }
// }

// const list = new SortedLinkedList();
// list.push(7)
// list.push(1)
// list.push(5)
// list.push(3)
// list.push(4)
// list.push(8)
// list.push(10)
// console.log(list.toString())