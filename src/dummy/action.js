import axios from "axios";

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: "dataRequest" });

    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );

    dispatch({ type: "dataSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "dataFailure" });
  }
};

export const dataSelect = (group, tickets, order) => async (dispatch) => {
  try {
    console.log("I am here", tickets.users);
    dispatch({ type: "dataSelectRequest" });

    let user = false;
    let set = new Set();
    let array = [];
    let dataSelected = [];

    if (order === "title") {
      dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    if (group === "status") {
      tickets.forEach((element) => {
        set.add(element.status);
      });

      array = [...set];

      array.forEach((element, index) => {
        let array = tickets.filter((filterElement) => {
          return element === filterElement.status;
        });
        dataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    } else if (group === "user") {
      user = true;
      tickets?.users?.forEach((element, index) => {
        array = tickets?.tickets?.filter((filterElement) => {
          return element.id === filterElement.userId;
        });

        dataSelected.push({
          [index]: {
            title: element.name,
            value: array,
          },
        });
      });
      console.log(dataSelected);
    } else {
      let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((element, index) => {
        array = tickets.filter((filterElement) => {
          return index === filterElement.priority;
        });

        dataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    }

    if (order === "priority") {
      dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    console.log(dataSelected);
    dispatch({ type: "dataSelectSuccess", payload: { dataSelected, user } });
  } catch (error) {
    dispatch({ type: "dataSelectFailure", payload: error.message });
  }
};

// export const dataSelect = (group, tickets, order) => async (dispatch) => {
//   try {
//     dispatch({ type: "dataSelectRequest" });
//     console.log(group);
//     let dataSelected = [];

//     if (group === "status") {
//       // Group by status
//       const uniqueStatus = Array.from(
//         new Set(tickets.map((ticket) => ticket.status))
//       ).sort();
//       dataSelected = uniqueStatus.map((status) => ({
//         title: status,
//         value: tickets.filter((ticket) => ticket.status === status),
//       }));
//     } else if (group === "user") {
//       // Group by user
//       dataSelected = tickets.users.map((user) => ({
//         title: user.name,
//         available: user.available,
//         value: tickets.tickets.filter((ticket) => ticket.userId === user.id),
//       }));
//       dataSelected.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (group === "priority") {
//       // Group by priority using the provided logic
//       let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];
//       priorityList.forEach((priority, index) => {
//         const array = tickets.tickets.filter(
//           (ticket) => ticket.priority === index
//         );
//         dataSelected.push({
//           [index]: {
//             title: priority,
//             value: array,
//           },
//         });
//       });
//     }

//     // Sort the data based on the user's order selection
//     if (order === "title") {
//       dataSelected.forEach((group) => {
//         group.value.sort((a, b) => a.title.localeCompare(b.title));
//       });
//     } else if (order === "priority") {
//       dataSelected.forEach((group) => {
//         group.value.sort((a, b) => b.priority - a.priority);
//       });
//     }
//     console.log("-------------");
//     console.log("selectd data", dataSelected);
//     dispatch({
//       type: "dataSelectSuccess",
//       payload: { dataSelected, user: group === "user" },
//     });
//   } catch (error) {
//     console.log("-------------");
//     dispatch({ type: "dataSelectFailure", payload: error.message });
//   }
// };
