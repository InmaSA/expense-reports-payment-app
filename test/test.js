const assert = require('chai').assert
const {addData, totalExpense} = require ("../public/javascripts/calculateTotal")




describe('AddFunction', () => {

  describe('Numbers', () => {
    it('should return 4', () => {
      assert.equal(addData([1,1,1,1]), 4)
    })
  })

  describe('String', () => {
    it('should return 41', () => {
      assert.equal(addData([1,1,1,1, '1']), '41')
    })
  })
})




describe('TotalUnitFunction', () => {

  describe('Total', () => {
    it('should return 60', () => {
      assert.equal(totalExpense([2,2,2], 8, 5, 10), 60)
    })
  })

  describe('Total', () => {
    it('should return 145', () => {
      assert.equal(totalExpense([6,7,8], 8, 5, 10), 145)
    })
  })

  describe('Total', () => {
    it('should return 245', () => {
      assert.equal(totalExpense([1,1,1,1,'1'], 8, 5, 10), 245)
    })
  })

  describe('Total', () => {
    it('should return 65', () => {
      assert.equal(totalExpense([6,7,8], 8, 5, null), 65)
    })
  })

  describe('Total', () => {
    it('should return 0', () => {
      assert.equal(totalExpense([2,2,2], 8, 5, null), 0)
    })
  })
})


