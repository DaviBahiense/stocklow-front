const initialState = {
  category: "",
  product: "",
  quantity: "",
  unity: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

const App = () => {
  const reducer = (state, action) => {
    if (action.type === "ADD") {
      const newState = [...state];
      newState.push({ id: action.id, value: action.value });
      return newState;
    }

    if (action.type === "UPDATE") {
      const newState = [...state];
      const foundItem = newState.find((item) => item.id === action.id);
      foundItem.value = action.value;
      return newState;
    }
  };

  const initialState = [];

  const [state, dispatch] = useReducer(reducer, initialState);

  const numberOfDays = 7;

  const inputText = ({ id, value }) => {
    if (state.find((item) => item.id === id)) {
      dispatch({ type: "UPDATE", id, value });
    } else {
      dispatch({ type: "ADD", id, value });
    }

    console.log(state);
  };

  const renderINP = () => {
    let td = [];
    for (let i = 1; i <= numberOfDays; i++) {
      td.push(
        <td key={i}>
          <input
            type="text"
            onChange={(e) => inputText({ id: i, value: e.target.value })}
          />
        </td>
      );
    }
    return td;
  };
};
