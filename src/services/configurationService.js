export default {
    getBillPurposes() {
        let result = fakeBillPurposes;
        return new Promise(resolve => resolve({ data: result }));
    }
}

const fakeBillPurposes = [
    {
        groupName: "Meal",
        options: [
            "Breakfast",
            "Lunch",
            "Dinner",
            "Supper",
            "Snack",
            "Drink",
            "Brunch"
        ]
    },
    {
        groupName: "Activity",
        options: ["Movie", "Sing K", "Games", "Workout"]
    },
    { groupName: "Event", options: ["Wedding", "Songka"] }
]