(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[function(e,t,n){},,,,function(e,t,n){e.exports=n(9)},function(e,t,n){"use strict";var i=n(0);n.n(i).a},,,,function(e,t,n){"use strict";n.r(t);var i=n(3);function s(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var c={name:"vue-multiclick",props:{items:{type:Array,required:!0},uid:{type:String,required:!0}},data:function(){return{selectedItems:[],lastSelected:null}},computed:{selectedIndexes:function(){var e=this;return this.selectedItems.map(function(t){return e.items.indexOf(t)})},lastSelectedIndex:function(){return this.getSelectedItemIndex(this.lastSelected)}},methods:{itemClicked:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!t.metaKey&&!t.ctrlKey||t.shiftKey?t.shiftKey?this.setSelectedItems(e):this.setSelectedItem(e):this.itemIsDuplicate(e)?this.removeFromSelection(e):this.appendToSelection(e),this.lastSelected=e},setSelectedItem:function(e){this.selectedItems=[e]},setSelectedItems:function(e){var t=this.getSelectedItemIndex(e);if(this.selectedItems.length)if(t>=this.lastSelectedIndex)for(var n=this.lastSelectedIndex;n<=t;n++)this.appendToSelection(this.items[n]);else for(var i=t;i<=this.lastSelectedIndex;i++)this.appendToSelection(this.items[i]);else for(var s=0;s<=t;s++)this.appendToSelection(this.items[s])},appendToSelection:function(e){this.selectedItems=s(new Set(this.selectedItems.concat([e])))},removeFromSelection:function(e){var t=this;this.selectedItems=this.selectedItems.filter(function(n){return n[t.uid]!==e[t.uid]})},getSelectedItemIndex:function(e){var t=this;return this.items.findIndex(function(n){return n[t.uid]===e[t.uid]})},itemIsDuplicate:function(e){var t=this;return this.selectedItems.map(function(e){return e[t.uid]}).includes(e[this.uid])},selectAll:function(){this.selectedItems=this.items},deselectAll:function(){this.selectedItems=[]}},render:function(){return this.$scopedSlots.default({selectedItems:this.selectedItems,selectedIndexes:this.selectedIndexes,itemClicked:this.itemClicked})}};"undefined"!==typeof window&&window.Vue&&window.Vue.component(c.name,c);var r={components:{VueMulticlick:c},data:function(){return{items:[{name:"A",id:1},{name:"B",id:2},{name:"C",id:3},{name:"D",id:4},{name:"E",id:5},{name:"F",id:6},{name:"G",id:7},{name:"H",id:8},{name:"I",id:9},{name:"J",id:10}]}}},l=(n(5),n(2)),d=Object(l.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("VueMulticlick",{attrs:{items:e.items,uid:"id"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.selectedItems,s=t.itemClicked;return[n("ul",e._l(e.items,function(t){return n("li",{key:t.name,class:{selected:i.includes(t)},on:{click:function(e){return s(t,e)}}},[e._v("\n        "+e._s(t.name)+"\n      ")])}),0)]}}])})],1)},[],!1,null,null,null).exports;new i.a({el:"#app",render:function(e){return e(d)}})}],[[4,2,0]]]);