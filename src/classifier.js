/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
const input = require('./inputs/input')

const {
  sort
} = require('./utils');
const {
  calculateAge
} = require('./utils');

function classifier(input) {
  // Your code should go here.
  debugger
  if (!input instanceof Array) throw Error();
  return input
    .slice()
    .map((a) => ({
      ...a,
      age: calculateAge(new Date(a.dob))
    }))
    .sort((a, b) => sort(a.age, b.age))
    .reduce((agg, curr, i, arr) => {
      let groups = Object.keys(agg);
      let activeGroup = agg[groups[groups.length - 1]]
      let activeGroupMembersLength = 0

      if (typeof activeGroup === 'object') {
        activeGroupMembersLength = activeGroup.members.length
      }
      let ageGapLessThan5 = i !== 0 && curr.age - arr[i - 1].age <= 5 && activeGroupMembersLength < 3;
      debugger
      if (!ageGapLessThan5) {
        agg.noOfGroups += 1
        agg[`group${agg.noOfGroups}`] = {
          members: [{
            name: curr.name,
            dob: curr.dob,
            regNo: curr.regNo,
            age: curr.age
          }],
          oldest: curr.age,
          sum: curr.age,
          regNos: [parseInt(curr.regNo, 10)],
        }
      } else if (ageGapLessThan5) {
        let members = activeGroup.members.concat({
          name: curr.name,
          dob: curr.dob,
          regNo: curr.regNo,
          age: curr.age
        })
        let regNos = activeGroup.regNos.concat(parseInt(curr.regNo, 10)).sort(sort)
        let oldest = curr.age

        agg[groups[groups.length - 1]] = {
          members,
          oldest,
          sum: members.reduce((arr, curr) => arr + curr.age, 0),
          regNos
        }
      }

      return agg;
    }, {
      noOfGroups: 0
    });
}

 let output= classifier(input)
 console.log(output)

module.exports = classifier;
