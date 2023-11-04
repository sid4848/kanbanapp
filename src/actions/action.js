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

export const dataSelect = (group, data, order) => async (dispatch) => {
  try {
    dispatch({ type: "dataSelectRequest" });
    let dataSelected = [];

    if (group === "status") {
      // Group by status
      const uniqueStatus = Array.from(
        new Set(data.map((ticket) => ticket.status))
      ).sort();
      dataSelected = uniqueStatus.map((status) => ({
        title: status,
        value: data?.filter((ticket) => ticket.status === status),
      }));
    } else if (group === "user") {
      // Group by user
      dataSelected = data.users.map((user) => ({
        title: user.name,
        available: user.available,
        value: data?.tickets.filter((ticket) => ticket.userId === user.id),
      }));
      dataSelected.sort((a, b) => a.title.localeCompare(b.title));
    } else if (group === "priority") {
      const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];
      dataSelected = priorityList.map((priority, index) => ({
        title: priority,
        value: data?.filter((ticket) => index === ticket.priority),
      }));
    }

    // Sort the data based on the user's order selection
    if (order === "title") {
      dataSelected?.forEach((group) => {
        group.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    } else if (order === "priority") {
      dataSelected?.forEach((group) => {
        group.value?.sort((a, b) => b.priority - a.priority);
      });
    }
    dispatch({
      type: "dataSelectSuccess",
      payload: { dataSelected, user: group === "user" },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "dataSelectFailure", payload: error.message });
  }
};
