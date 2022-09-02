const initialState = {};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/default-param-last
export default function reducer(state = initialState, action: { type: string; payload?: never }) {
  switch (action.type) {
    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return { ...state, ...action.payload };
    }
  }
}
