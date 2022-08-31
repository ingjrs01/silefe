import React, {useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';

const spritemap = '/icons.svg';

const TitulacionForm = () => {
    const [active, setActive] = useState(false);

    return (
      <ClayForm>
        <ClayForm.Group className="has-success">
          <label htmlFor="basicInput">Código</label>
          <ClayInput placeholder="Código" type="text"></ClayInput>
          <ClayForm.FeedbackGroup>
            <ClayForm.FeedbackItem>
              {"Esto va muy guay"}
            </ClayForm.FeedbackItem>
            <ClayForm.FeedbackItem>
              <ClayForm.FeedbackIndicator
                spritemap={spritemap}
                symbol="check-circle-full"
              />
              {"This is a form-feedback-item with a check feedback indicator."}
            </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        </ClayForm.Group>
        <ClayForm.Group className="has-warning">
          <label htmlFor="basicInput">Descripción</label>
          <textarea className="form-control" placeholder="Descripción"></textarea>
          <ClayForm.FeedbackGroup>
            <ClayForm.FeedbackItem>
              {"This is a form-feedback-item."}
            </ClayForm.FeedbackItem>
            <ClayForm.FeedbackItem>
              <ClayForm.FeedbackIndicator
                spritemap={spritemap}
                symbol="warning-full"
              />
              {"This is a form-feedback-item with a warning feedback indicator."}
            </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        </ClayForm.Group>

      </ClayForm>
    );
  }

export default TitulacionForm;