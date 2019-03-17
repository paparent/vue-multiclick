import { shallowMount } from "@vue/test-utils"
import VueMulticlick from "../src"
// import cloneDeep from "lodash.clonedeep"

describe("VueMulticlick", () => {
  let sampleItems = [
    { name: "A", id: 1 },
    { name: "B", id: 2 },
    { name: "C", id: 3 },
    { name: "D", id: 4 },
    { name: "E", id: 5 },
    { name: "F", id: 6 },
    { name: "G", id: 7 },
    { name: "H", id: 8 },
    { name: "I", id: 9 },
    { name: "J", id: 10 }
  ]

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VueMulticlick, {
      propsData: {
        items: sampleItems,
        uid: "id"
      },
      slots: {
        default: "<ul></ul>"
      }
    })
  })

  it("can select a single item", () => {
    wrapper.vm.setSelectedItem(sampleItems[2])

    expect(wrapper.vm.selectedItems).toEqual([sampleItems[2]])

    wrapper.vm.setSelectedItem(sampleItems[4])

    expect(wrapper.vm.selectedItems).toEqual([sampleItems[4]])
  })

  describe("Selecting multiple items", () => {
    it("selects from index 0 to the chosen item when no items are selected", () => {
      wrapper.vm.setSelectedItems(sampleItems[4])

      expect(wrapper.vm.selectedItems).toEqual([
        sampleItems[0],
        sampleItems[1],
        sampleItems[2],
        sampleItems[3],
        sampleItems[4]
      ])
    })

    it("selects from the last selected item to the newly selected item", () => {
      wrapper.setData({
        selectedItems: [sampleItems[2], sampleItems[4]],
        lastSelected: sampleItems[2]
      })

      wrapper.vm.setSelectedItems(sampleItems[6])

      expect(wrapper.vm.selectedItems).toEqual([
        sampleItems[2],
        sampleItems[4],
        sampleItems[3],
        sampleItems[5],
        sampleItems[6]
      ])

      wrapper.vm.selectedItems = [sampleItems[5]]
      wrapper.vm.lastSelected = sampleItems[5]

      wrapper.vm.setSelectedItems(sampleItems[2])

      expect(wrapper.vm.selectedItems).toEqual([sampleItems[5], sampleItems[2], sampleItems[3], sampleItems[4]])
    })
  })

  it("appends a single item to the list, and does not allow duplicates", () => {
    wrapper.setData({
      selectedItems: [sampleItems[0]]
    })

    wrapper.vm.appendToSelection(sampleItems[2])

    expect(wrapper.vm.selectedItems).toEqual([sampleItems[0], sampleItems[2]])

    wrapper.vm.appendToSelection(sampleItems[0])

    expect(wrapper.vm.selectedItems).toEqual([sampleItems[0], sampleItems[2]])
  })

  it("removes items from the selection", () => {
    wrapper.setData({
      selectedItems: [sampleItems[0], sampleItems[1]]
    })

    wrapper.vm.removeFromSelection(sampleItems[1])

    expect(wrapper.vm.selectedItems).toEqual([sampleItems[0]])
  })

  it("can get the index of a given item", () => {
    wrapper.setData({
      selectedItems: [sampleItems[3], sampleItems[4]]
    })

    const index = wrapper.vm.getSelectedItemIndex(sampleItems[4])

    expect(index).toBe(4)
  })

  it("can determine if a given item is a duplicate", () => {
    wrapper.setData({
      selectedItems: [sampleItems[3], sampleItems[4]]
    })

    const dupe = sampleItems[4]
    const notDupe = sampleItems[5]

    expect(wrapper.vm.itemIsDuplicate(dupe)).toBeTruthy()
    expect(wrapper.vm.itemIsDuplicate(notDupe)).toBeFalsy()
  })

  it("can select all items", () => {
    wrapper.setData({
      selectedItems: [sampleItems[4]]
    })

    wrapper.vm.selectAll()

    expect(wrapper.vm.selectedItems).toEqual(wrapper.vm.items)
  })

  it("can deselect all items", () => {
    wrapper.setData({
      selectedItems: [sampleItems[1], sampleItems[4], sampleItems[6]]
    })

    wrapper.vm.deselectAll()

    expect(wrapper.vm.selectedItems).toEqual([])
  })

  describe("Clicking an item", () => {
    beforeEach(() => {
      jest.resetModules()
      jest.clearAllMocks()
    })

    it("sets the selected item to the clicked item when no modifier keys are pressed", () => {
      const $event = {}
      const selectedSpy = jest.spyOn(wrapper.vm, "setSelectedItem")

      wrapper.setData({
        selectedItems: [sampleItems[0], sampleItems[1]]
      })

      wrapper.vm.itemClicked(sampleItems[4], $event)

      expect(selectedSpy).toHaveBeenCalledWith(sampleItems[4])
    })

    it("appends an item when meta or ctrl key is held and the item is not a duplicate", () => {
      const $event = { metaKey: true }
      const appendSpy = jest.spyOn(wrapper.vm, "appendToSelection")

      wrapper.vm.itemClicked(sampleItems[1], $event)

      expect(appendSpy).toHaveBeenCalledWith(sampleItems[1])
    })

    it("removes an item when meta or ctrl key is held and the item is a duplicate", () => {
      const $event = { ctrlKey: true }
      const removeSpy = jest.spyOn(wrapper.vm, "removeFromSelection")

      wrapper.setData({
        selectedItems: [sampleItems[1]]
      })

      wrapper.vm.itemClicked(sampleItems[1], $event)

      expect(removeSpy).toHaveBeenCalledWith(sampleItems[1])
    })

    it("does not append or remove an item if the shift key is pressed in conjuction with the meta/ctrl key", () => {
      const $event = { metaKey: true, shiftKey: true }
      const appendSpy = jest.spyOn(wrapper.vm, "appendToSelection")

      wrapper.vm.setSelectedItems = jest.fn()
      wrapper.vm.setSelectedItem = jest.fn()

      wrapper.vm.itemClicked(sampleItems[1], $event)

      expect(appendSpy).not.toHaveBeenCalled()
    })

    it("sets the selection range when the shift key is held", () => {
      const $event = { shiftKey: true }
      const selectItemsSpy = jest.spyOn(wrapper.vm, "setSelectedItems")

      wrapper.vm.itemClicked(sampleItems[5], $event)

      expect(selectItemsSpy).toHaveBeenCalledWith(sampleItems[5])
    })

    it("sets the last selected item to the item clicked", () => {
      const $event = {}

      expect(wrapper.vm.lastSelected).toBeNull()

      wrapper.vm.itemClicked(sampleItems[5], $event)

      expect(wrapper.vm.lastSelected).toEqual(sampleItems[5])
    })
  })

  describe("Computed properties", () => {
    it("can return the indexes of selected items", () => {
      wrapper.setData({
        selectedItems: [sampleItems[1], sampleItems[4], sampleItems[6]]
      })

      expect(wrapper.vm.selectedIndexes).toEqual([1, 4, 6])
    })

    it("can return the index of the last selected item", () => {
      wrapper.setData({
        selectedItems: [sampleItems[1], sampleItems[4], sampleItems[6]],
        lastSelected: sampleItems[6]
      })

      expect(wrapper.vm.lastSelectedIndex).toBe(6)
    })
  })
})
