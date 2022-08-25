import React from 'react';

export class LoggingButton extends React.Component {
  constructor({ props }: { props: never }) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { isToggleOn: false };
  }

  handleClick(): void {
    // eslint-disable-next-line no-console
    console.log(this);
  }

  render(): React.ReactElement {
    // Такой синтаксис гарантирует, что `this` привязан к handleClick.
    return <button onClick={(): void => this.handleClick()}>Нажми на меня</button>;
  }
}
