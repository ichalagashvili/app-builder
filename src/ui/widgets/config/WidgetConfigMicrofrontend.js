import { get } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import { Button } from 'patternfly-react';

import { getResourcePath, getMicrofrontend, renderMicrofrontend } from 'helpers/microfrontends';
import useScripts from 'helpers/useScripts';
import useStylesheets from 'helpers/useStylesheets';

export const MFE_WIDGET_FORM_ID = 'mfeWidgetForm';

const WidgetConfigMicrofrontend = ({
  widget, widgetConfig,
}) => {
  const resources = get(widget, 'configUi.resources', []).map(getResourcePath);
  const customElement = get(widget, 'configUi.customElement');

  const scripts = resources.filter(res => res.endsWith('.js'));
  const styleSheets = resources.filter(res => res.endsWith('.css'));

  const [everyScriptLoaded, someScriptError] = useScripts(scripts);
  const [everyStylesheetLoaded, someStylesheetError] = useStylesheets(styleSheets);

  // const handleSubmitTriggered = () => {
  //   const configWebComponent = getMicrofrontend(customElement);
  //   const updatedWidgetConfig = configWebComponent ? configWebComponent.config : null;
  //   onSubmit({ widgetConfig: updatedWidgetConfig, isMfe: true });
  // };

  useEffect(() => {
    const microfrontend = getMicrofrontend(customElement);
    if (everyScriptLoaded && microfrontend && widgetConfig) {
      microfrontend.config = widgetConfig;
    }
  }, [customElement, everyScriptLoaded, widgetConfig]);

  const microfrontendMarkup = renderMicrofrontend(customElement);
  return (scripts.length && everyScriptLoaded && everyStylesheetLoaded
    && !someScriptError && !someStylesheetError) ? (
      <Fragment>
        {microfrontendMarkup}
        {/* <Button
          className="pull-right save"
          type="submit"
          bsStyle="primary"
          onClick={handleSubmitTriggered}
        ><FormattedMessage id="app.save" />
        </Button> */}
      </Fragment>
    ) : <FormattedMessage id="widget.page.config.error" />;
};

WidgetConfigMicrofrontend.propTypes = {
  widget: PropTypes.shape({}).isRequired,
  widgetConfig: PropTypes.shape({}),
  // onSubmit: PropTypes.func.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
};

WidgetConfigMicrofrontend.defaultProps = {
  widgetConfig: null,
};

export default WidgetConfigMicrofrontend;
