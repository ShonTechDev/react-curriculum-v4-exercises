import { useContext, useEffect, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

function OptionEditor({ questionId, option, optionIndex, canDelete }) {
  const [optionText, setOptionText] = useState(option);
  const { dispatch } = useContext(SurveyContext);

  useEffect(() => {
    setOptionText(option);
  }, [option]);

  function handleSaveOption() {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId,
        optionIndex,
        newText: optionText,
      },
    });
  }

  function handleDeleteOption() {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId,
        optionIndex,
      },
    });
  }

  return (
    <>
      <input
        type="text"
        value={optionText}
        onChange={(event) => setOptionText(event.target.value)}
      />

      <button type="button" onClick={handleSaveOption}>
        Save
      </button>

      <button type="button" disabled={!canDelete} onClick={handleDeleteOption}>
        Delete
      </button>
    </>
  );
}

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  const [workingText, setWorkingText] = useState(question.question);
  const { state, dispatch } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  useEffect(() => {
    setWorkingText(question.question);
  }, [question.question]);

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
      return;
    }

    setWorkingText(question.question);

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: question.id },
    });
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        questionId: question.id,
        newText: workingText,
      },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (shouldDelete) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  const handleAddOption = () => {
    const optionText = window.prompt('Enter new option text:');

    if (!optionText) {
      return;
    }

    dispatch({
      type: 'ADD_OPTION_TO_QUESTION',
      payload: {
        questionId: question.id,
        optionText,
      },
    });
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>

        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={workingText}
              onChange={(event) => setWorkingText(event.target.value)}
            />

            <button type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          <ul>
            {question.options.map((option, index) => (
              <li
                key={`${question.id}-${index}`}
                className={styles['option-item']}
              >
                {isEditing ? (
                  <OptionEditor
                    questionId={question.id}
                    option={option}
                    optionIndex={index}
                    canDelete={question.options.length > 2}
                  />
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditing && (
            <button type="button" onClick={handleAddOption}>
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
