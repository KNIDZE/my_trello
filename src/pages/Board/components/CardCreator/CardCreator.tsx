import React, { useState } from 'react';
import './cardCreator.scss';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardCreatorFunctions, turnCardCreator } from '../../../../store/modules/board/actions';

function CardCreator(props: CreatorProps): React.ReactElement {
  const { createCard, listId } = props;
  const { boardId } = useParams();
  const [showCreator, changeCreatorVisibility] = useState(false);
  const [cardText, saveCardText] = useState('');
  // eslint-disable-next-line no-console
  if (showCreator) {
    return (
      <div className="card_creator">
        <textarea
          className="create_card_textarea"
          onBlur={(e): void => saveCardText(e.currentTarget.value || '')}
          contentEditable="true"
        />
        <div className="button_panel">
          <button
            className="create_card_button"
            onClick={(): void => {
              createCard(cardText, listId, boardId || '');
              changeCreatorVisibility(false);
            }}
          >
            Создать
          </button>
          <div className="delete_button" onClick={(): void => changeCreatorVisibility(false)} />
        </div>
      </div>
    );
  }
  return (
    <button className="add_card" onClick={(): void => changeCreatorVisibility(true)}>
      <p>+</p>
    </button>
  );
}
interface Props {
  showCardCreator: boolean;
  cardText: string;
}
function mapStateToProps(state: { board: Props }): Props {
  return {
    showCardCreator: state.board.showCardCreator,
    cardText: state.board.cardText,
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mergeProps = (stateProps: Props, dispatchProps: CardCreatorFunctions, ownProps: { listId: string }) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});
const connector = connect(mapStateToProps, turnCardCreator, mergeProps);
type CreatorProps = ConnectedProps<typeof connector>;
export default connector(CardCreator);
