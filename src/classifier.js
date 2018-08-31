const {_calculateAge, sort} = equire('./utils');

function classifier(input){
	if(typeof input !== 'array') throw Error()

	return input.map((a)=>({
		...a,
		age:_calculateAge(new Date(a.dob))
	}))
		.sort((a,b)=>({
			sort(a.age,b.age)
		}))
			.reduce((agg,curr,i,arr)=>{
				let groups = Object.keys(agg)
				let activeGroup = agg[groups[groups.length - 1]]
				let activeGroupMembersLength = 0

				if(typeof activeGroup === 'object'){
					activeGroupMembersLength = activeGroup.members.length
				}

				let ageGapLessThan5 = i !== && curr.age - arr[i-1].age <= 5 && activeGroupMembersLength < 3;

				if(!ageGapLessThan5){
					agg.noOfGroups += 1
					agg[`groups${agg.noOfGroups}`]={
						members: [{
							name:curr.name,
							dob:curr.dob,
							regNo: curr.regNo,
							age: curr.age
						}],
						oldest: curr.age,
						sum:curr.age,
						regNos:[parseInt(curr.regNo, 10)]
					}
				}else if(ageGapLessThan5){
					let members = activeGroup.members.concat({
						name: curr.name,
						dob: curr.regNo,
						age: curr.age
					})
					let regNos = activeGroup.regNos.concat((parseInt(curr.regNo, 10)).sort(sort)
						let oldest = curr.age

						agg[group[groups.length - 1]]={
							members,
							oldest,
							sum: members.reduce((arr, curr)=> arr + curr.age, 0),
							regNos
						}
				}
				return agg

			}, {
				noOfGroups:0
			})
}

module.exports = classifier