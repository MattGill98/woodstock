/**
 * The contents of this file are subject to the terms
 * of the Common Development and Distribution License
 * (the License).  You may not use this file except in
 * compliance with the License.
 * 
 * You can obtain a copy of the license at
 * https://woodstock.dev.java.net/public/CDDLv1.0.html.
 * See the License for the specific language governing
 * permissions and limitations under the License.
 * 
 * When distributing Covered Code, include this CDDL
 * Header Notice in each file and include the License file
 * at https://woodstock.dev.java.net/public/CDDLv1.0.html.
 * If applicable, add the following below the CDDL Header,
 * with the fields enclosed by brackets [] replaced by
 * you own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 * 
 * Copyright 2008 Sun Microsystems, Inc. All rights reserved.
 */

webui.@THEME@.dojo.provide("webui.@THEME@.widget.progressBar");

webui.@THEME@.dojo.require("webui.@THEME@.widget.widgetBase");

/**
 * @name webui.@THEME@.widget.progressBar
 * @extends webui.@THEME@.widget.widgetBase
 * @class This class contains functions for the progressBar widget.
 * @constructor This function is used to construct a progressBar widget.
 */
webui.@THEME@.dojo.declare("webui.@THEME@.widget.progressBar", webui.@THEME@.widget.widgetBase, {
    // Set defaults.
    percentChar: "%",
    progress: 0,
    type: "DETERMINATE",
    busy: "BUSY",
    canceled: "canceled",
    completed: "completed",
    determinate: "DETERMINATE",
    failed: "failed",
    indeterminate: "INDETERMINATE",
    notstarted: "not_started",
    paused: "paused",
    resumed: "resumed",
    stopped: "stopped",
    widgetName: "progressBar"
});

/**
 * This function handles cancel progressBar event.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.cancel = function() {
    clearTimeout(this.timeoutId);

    this.hiddenFieldNode.value = this.canceled;
    if (this.type == this.determinate) {
        this.innerBarContainer.style.width = "0%";
    }
    return this.updateProgress();
};

/**
 * This object contains event topics.
 * <p>
 * Note: Event topics must be prototyped for inherited functions. However, these
 * topics must also be available statically so that developers may subscribe to
 * events.
 * </p>
 * @ignore
 */
webui.@THEME@.widget.progressBar.event =
        webui.@THEME@.widget.progressBar.prototype.event = {
    /**
     * This closure is used to publish progress events.
     * @ignore
     */
    progress: {
        /** Progress event topic for custom AJAX implementations to listen for. */
        beginTopic: "webui_@THEME@_widget_progressBar_event_progress_begin",

        /** Progress event topic for custom AJAX implementations to listen for. */
        endTopic: "webui_@THEME@_widget_progressBar_event_progress_end"
    },

    /**
     * This object contains refresh event topics.
     * @ignore
     */
    refresh: {
        /** Refresh event topic for custom AJAX implementations to listen for. */
        beginTopic: "webui_@THEME@_widget_progressBar_event_refresh_begin",

        /** Refresh event topic for custom AJAX implementations to listen for. */
        endTopic: "webui_@THEME@_widget_progressBar_event_refresh_end"
    },

    /**
     * This object contains state event topics.
     * @ignore
     */
    state: {
        /** State event topic for custom AJAX implementations to listen for. */
        beginTopic: "webui_@THEME@_widget_progressBar_event_state_begin",

        /** State event topic for custom AJAX implementations to listen for. */
        endTopic: "webui_@THEME@_widget_progressBar_event_state_end"
    }
};

/**
 * This function is used to get widget properties. Please see the 
 * setProps() function for a list of supported properties.
 *
 * @return {Object} Key-Value pairs of properties.
 */
webui.@THEME@.widget.progressBar.prototype.getProps = function() {
    var props = this.inherited("getProps", arguments);

    // Set properties.
    if (this.height) { props.height = this.height; }
    if (this.width) { props.width = this.width; }
    if (this.bottomText) { props.bottomText = this.bottomText; }
    if (this.busyImage != null) { props.busyImage = this.busyImage; }
    if (this.failedStateText != null) { props.failedStateText = this.failedStateText; }
    if (this.id) { props.id = this.id; }
    if (this.log != null) { props.log = this.log; }
    if (this.logId) { props.logId = this.logId; }
    if (this.logMessage) { props.logMessage = this.logMessage; }
    if (this.overlayAnimation != null) { props.overlayAnimation = this.overlayAnimation; }
    if (this.percentChar) { props.percentChar = this.percentChar; }
    if (this.progress != null) { props.progress = this.progress; }
    if (this.progressImageUrl) { props.progressImageUrl = this.progressImageUrl; }
    if (this.progressControlBottom != null) { props.progressControlBottom = this.progressControlBottom; }
    if (this.progressControlRight != null) { props.progressControlRight = this.progressControlRight; }
    if (this.refreshRate) { props.refreshRate = this.refreshRate; }
    if (this.taskState != null) { props.taskState = this.taskState; }
    if (this.toolTip) { props.toolTip = this.toolTip; }
    if (this.topText) { props.topText = this.topText; }
    if (this.type) { props.type = this.type; }

    return props;
};

/**
 * This function is used to obtain the outermost HTML element class name.
 * <p>
 * Note: Selectors should be concatinated in order of precedence (e.g., the 
 * user's className property is always appended last).
 * </p>
 * @return {String} The outermost HTML element class name.
 */
webui.@THEME@.widget.progressBar.prototype.getClassName = function() {
    var key = "PROGRESSBAR"; 

    // Get theme property.
    var className = this.theme.getClassName(key);
    if (className == null || className.length == 0) {
	return this.className;
    }
    return (this.className)
        ? className + " " + this.className
        : className;
};

/**
 * This method displays the Bottom Controls if it was hidden.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isBottomControlVisible = function() {
    return this.common.isVisibleElement(this.bottomControlsContainer);
};

/**
 * This method displays the failed state message and icon if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isFailedStateMessageVisible = function() {
    return this.common.isVisibleElement(this.failedStateContainer);
};

/**
 * This method displays the log message if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isLogMsgVisible = function() {
    return this.common.isVisibleElement(this.logContainer);
};

/**
 * This method displays the operation text if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isOperationTextVisible = function() {
    return this.common.isVisibleElement(this.topTextContainer);
};

/**
 * This method displays the ProgressBar Container if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isProgressBarContainerVisible = function() {
    return this.common.isVisibleElement(this.barContainer);
};

/**
 * This method displays the ProgressBar if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isProgressBarVisible = function() {
    return this.common.isVisibleElement(this); 
};

/**
 * This method displays the Right Controls if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isRightControlVisible = function() {
    return this.common.isVisibleElement(this.rightControlsContainer);
};

/**
 * This method displays the status text if it was hidden.
 *
* @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.isStatusTextVisible = function() {
    return this.common.isVisibleElement(this.bottomTextContainer);
};

/**
 * This function handles pause button event.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.pause = function() {
    clearTimeout(this.timeoutId);

    this.hiddenFieldNode.value = this.paused;
    if (this.type == this.indeterminate) {
        this.innerBarContainer.className =
            this.theme.getClassName("PROGRESSBAR_INDETERMINATE_PAUSED");
    }
    return this.updateProgress();
};

/**
 * This function is used to fill in remaining template properties, after the
 * buildRendering() function has been processed.
 * <p>
 * Note: Unlike Dojo 0.4, the DOM nodes don't exist in the document, yet. 
 * </p>
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.postCreate = function () {
    // Set ids.
    if (this.id) {
        this.barContainer.id = this.id + "_barContainer";
        this.bottomControlsContainer.id = this.id + "_bottomControlsContainer";
        this.bottomTextContainer.id = this.id + "_bottomTextContainer"; 
        this.failedStateContainer.id = this.id + "_failedStateContainer";
        this.failedLabelContainer.id = this.id + "_failedLabelContainer";
        this.hiddenFieldNode.id = this.id + "_" + "controlType";
        this.hiddenFieldNode.name = this.hiddenFieldNode.id;
        this.innerBarContainer.id = this.id + "_innerBarContainer";
        this.innerBarOverlayContainer.id = this.id + "_innerBarOverlayContainer";
        this.logContainer.id = this.id + "_logContainer";
        this.rightControlsContainer.id = this.id + "_rightControlsContainer";
        this.topTextContainer.id = this.id + "_topTextContainer"; 
    }

    // Set public functions
    this.domNode.cancel = function() { return webui.@THEME@.dijit.byId(this.id).cancel(); };
    this.domNode.isBottomControlVisible = function() { return webui.@THEME@.dijit.byId(this.id).isBottomControlVisible(); };
    this.domNode.isFailedStateMessageVisible = function() { return webui.@THEME@.dijit.byId(this.id).isFailedStateMessageVisible(); };
    this.domNode.isLogMsgVisible = function() { return webui.@THEME@.dijit.byId(this.id).isLogMsgVisible(); };
    this.domNode.isOperationTextVisible = function() { return webui.@THEME@.dijit.byId(this.id).isOperationTextVisible(); };
    this.domNode.isProgressBarContainerVisible = function() { return webui.@THEME@.dijit.byId(this.id).isProgressBarContainerVisible(); };
    this.domNode.isProgressBarVisible = function() { return webui.@THEME@.dijit.byId(this.id).isProgressBarVisible(); };
    this.domNode.isRightControlVisible = function() { return webui.@THEME@.dijit.byId(this.id).isRightControlVisible(); };
    this.domNode.isStatusTextVisible = function() { return webui.@THEME@.dijit.byId(this.id).isStatusTextVisible(); };
    this.domNode.pause = function() { return webui.@THEME@.dijit.byId(this.id).pause(); };
    this.domNode.resume = function() { return webui.@THEME@.dijit.byId(this.id).resume(); };
    this.domNode.stop = function() { return webui.@THEME@.dijit.byId(this.id).stop(); };
    this.domNode.setOnCancel = function(func) { return webui.@THEME@.dijit.byId(this.id).setOnCancel(func); };
    this.domNode.setOnComplete = function(func) { return webui.@THEME@.dijit.byId(this.id).setOnComplete(func); };
    this.domNode.setOnFail = function(func) { return webui.@THEME@.dijit.byId(this.id).setOnFail(func); };
    this.domNode.setBottomControlVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setBottomControlVisible(show); };
    this.domNode.setFailedStateMessageVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setFailedStateMessageVisible(show); };
    this.domNode.setLogMsgVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setLogMsgVisible(show); };
    this.domNode.setOperationTextVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setOperationTextVisible(show); };
    this.domNode.setProgressBarContainerVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setProgressBarContainerVisible(show); };
    this.domNode.setProgressBarVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setProgressBarVisible(show); };
    this.domNode.setRightControlVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setRightControlVisible(show); };
    this.domNode.setStatusTextVisible = function(show) { return webui.@THEME@.dijit.byId(this.id).setStatusTextVisible(show); };

    if (this.busyImage == null) {
	this.busyImage = this.widget.getImageProps("PROGRESS_BUSY", {
            id: this.id + "_busy"
        });
    }
    return this.inherited("postCreate", arguments);
};

/**
 * This function handles resume button event.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.resume = function() {
    clearTimeout(this.timeoutId);

    this.hiddenFieldNode.value = this.resumed;
    if (this.type == this.indeterminate) {
        this.innerBarContainer.className = 
            this.theme.getClassName("PROGRESSBAR_INDETERMINATE");
            
    }
    return this.updateProgress();
};

/**
 * This method hides the Bottom Control.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setBottomControlVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this.bottomControlsContainer, show);
    return true;
};

/**
 * This method hides the failed state message and icon area.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setFailedStateMessageVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this.failedStateContainer, show);
    return true;
};

/**
 * This method hides the log message area.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setLogMsgVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this.logContainer, show);
    return true;
};

/**
 * This function invokes developer define function for cancel event.
 * 
 * @param {Function} func The JavaScript function.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setOnCancel = function(func) {
    if (func) {
        this.funcCanceled = func;
    }
    return true;
};

/**
 * This function invokes developer define function for complete event.
 * 
 * @param {Function} func The JavaScript function.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setOnComplete = function(func) {
    if (func) {
        this.funcComplete = func;
    }
    return true;
};

/**
 * This function invokes developer define function for failed event.
 * 
 * @param {Function} func The JavaScript function.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setOnFail = function(func) {
    if (func) {
        this.funcFailed = func;
    }
    return true;
};

/**
 * This method hides the operation text.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setOperationTextVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this.topTextContainer, show);
    return true;
};

/**
 * This function is used to set progress with Object literals.
 *
 * @param {Object} props Key-Value pairs of properties.
 * @config {String} failedStateText
 * @config {String} logMessage
 * @config {int} progress
 * @config {String} status
 * @config {String} taskState
 * @config {String} topText
 * @config {String} type
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setProgress = function(props) {
    if (props == null) {
        return false;
    }
      
    // Adjust max value.
    if (props.progress > 99 
            || props.taskState == this.completed) {
        props.progress = 100;
    }

    // Save properties for later updates.
    this.prototypejs.extend(this, props);    

    // Set status.
    if (props.status) {
        this.widget.addFragment(this.bottomTextContainer, props.status);
    }

    // If top text doesnt get change, dont update.
    if (props.topText) {
        if (props.topText != this.topText) {
            this.widget.addFragment(this.topTextContainer, props.topText);
        }
    }

    // Update log messages.
    if (this.type == this.determinate) { 
        if (props.progress != null && props.progress >= 0 ) {
            this.innerBarContainer.style.width = props.progress + '%';
        }

        if (props.logMessage) {
            var field = webui.@THEME@.dijit.byId(this.logId).getInputElement();
            if (field != null) {
                field.value = (field.value)
                   ? field.value + props.logMessage + "\n"
                   : props.logMessage + "\n";
            }
        }

        // Add overlay text.
        if (this.overlayAnimation == true) {
            // NOTE: If you set this value manually, text must be HTML escaped.
            this.widget.addFragment(this.innerBarOverlayContainer, props.progress + "%");
        }
    } 

    // Failed state.
    if (props.taskState == this.failed) {
        clearTimeout(this.timeoutId);
        this.widget.sleep(1000);
        this.setProgressBarContainerVisible(false);
        this.setBottomControlVisible(false);
        this.setRightControlVisible(false);
        this.setLogMsgVisible(false);

        if (props.failedStateText != null) {
            // NOTE: If you set this value manually, text must be HTML escaped.
            this.widget.addFragment(this.failedLabelContainer,
                props.failedStateText + " " + props.progress + this.percentChar);

            this.common.setVisibleElement(this.failedLabelContainer, true);
            this.common.setVisibleElement(this.failedStateContainer, true);
        }
        if (this.funcFailed != null) {
            (this.funcFailed)();
        }
        return true;
    }

    // Cancel state.
    if (props.taskState == this.canceled) {
        clearTimeout(this.timeoutId);
        this.widget.sleep(1000);
        this.setOperationTextVisible(false);
        this.setStatusTextVisible(false);
        this.setProgressBarContainerVisible(false);
        this.setBottomControlVisible(false);
        this.setRightControlVisible(false);
        this.setLogMsgVisible(false);

        if (this.type == this.determinate) {
            this.innerBarContainer.style.width = "0%";
        }
        if (this.funcCanceled != null) {
           (this.funcCanceled)(); 
        }
        return true;    
    }

    // paused state
    if (props.taskState == this.paused) {
        clearTimeout(this.timeoutId);
        return true;
    }

    // stopped state
    if (props.taskState == this.stopped) {
        clearTimeout(this.timeoutId);
        return true;
    }

    if (props.progress > 99 
            || props.taskState == this.completed) {
        clearTimeout(this.timeoutId);
        if (this.type == this.indeterminate) {
            this.innerBarContainer.className =
                this.theme.getClassName("PROGRESSBAR_INDETERMINATE_PAUSED");
        }
        if (this.type == this.busy) {
            this.setProgressBarContainerVisible(false);
        }
        if (this.funcComplete != null) {
           (this.funcComplete)(); 
        }
    }

    // Set progress for A11Y.
    if (props.progress) {
        if (this.bottomTextContainer.setAttributeNS) {
            this.bottomTextContainer.setAttributeNS("http://www.w3.org/2005/07/aaa",
                "valuenow", props.progress);
        }
    }
    return true;
};

/**
 * This method hides the ProgressBar Container.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setProgressBarContainerVisible = function(show) {
    if (show == null) {
        return false;
    }

    if (show == false) {
        this.barContainer.style.display = "none";
    } else {
        this.barContainer.style.display = '';
    }
    return true; 
};

/**
 * This method hides the ProgressBar.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setProgressBarVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this, show);
    return true; 
};

/**
 * This function is used to set widget properties using Object literals.
 * <p>
 * Note: This function extends the widget object for later updates. Further, the
 * widget shall be updated only for the given key-value pairs.
 * </p><p>
 * If the notify param is true, the widget's state change event shall be
 * published. This is typically used to keep client-side state in sync with the
 * server.
 * </p>
 *
 * @param {Object} props Key-Value pairs of properties.
 * @config {String} bottomText 
 * @config {Object} busyImage 
 * @config {String} failedStateText
 * @config {String} id Uniquely identifies an element within a document.
 * @config {String} logId 
 * @config {boolean} logMessage 
 * @config {String} overlayAnimation 
 * @config {String} percentChar 
 * @config {int} progress 
 * @config {String} progressImageUrl 
 * @config {String} progressControlBottom
 * @config {String} progressControlRight 
 * @config {int} refreshRate 
 * @config {String} taskState
 * @config {String} toolTip 
 * @config {String} topText 
 * @config {String} type 
 * @config {boolean} visible Hide or show element.
 * @config {int} width 
 * @param {boolean} notify Publish an event for custom AJAX implementations to listen for.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setProps = function(props, notify) {
    // Note: This function is overridden for JsDoc.
    return this.inherited("setProps", arguments);
};

/**
 * This function is used to set widget properties. Please see the setProps() 
 * function for a list of supported properties.
 * <p>
 * Note: This function should only be invoked through setProps().
 * </p>
 * @param {Object} props Key-Value pairs of properties.
 * @return {boolean} true if successful; otherwise, false.
 * @private
 */
webui.@THEME@.widget.progressBar.prototype._setProps = function(props) {
    if (props == null) {
        return false;
    }

    // Set tool tip.
    if (props.toolTip) {
        this.barContainer.title = props.toolTip;
    }

    // Add top text.
    if (props.topText) {
        this.widget.addFragment(this.topTextContainer, props.topText); 
        this.common.setVisibleElement(this.topTextContainer, true);
    }

    // Add bottom text.
    if (props.bottomText) {
        this.widget.addFragment(this.bottomTextContainer, props.bottomText);
        this.common.setVisibleElement(this.bottomTextContainer, true);
    }

    if (props.type == this.determinate 
            || props.type == this.indeterminate) {
        // Set style class.
        this.barContainer.className =
            this.theme.getClassName("PROGRESSBAR_CONTAINER");

        // Set height.
        if (props.height != null && props.height > 0) {
            this.barContainer.style.height = props.height + "px;"; 
            this.innerBarContainer.style.height = props.height + "px;";
        }

        // Set width.
        if (props.width != null && props.width > 0) {
            this.barContainer.style.width = props.width + "px;";
        }

        // Add right controls.
        if (props.progressControlRight != null) {
            this.widget.addFragment(this.rightControlsContainer, props.progressControlRight);
            this.common.setVisibleElement(this.rightControlsContainer, true);
        }

        // Add bottom controls.
        if (props.progressControlBottom != null) {
            this.widget.addFragment(this.bottomControlsContainer, props.progressControlBottom);
            this.common.setVisibleElement(this.bottomControlsContainer, true);
        }
    }

    if (props.type == this.determinate) {
        // Set style class.
        this.innerBarContainer.className =
            this.theme.getClassName("PROGRESSBAR_DETERMINATE");

        // Set width.
        if (this.progress != null && this.progress >= 0) {
            this.innerBarContainer.style.width = this.progress + '%';
        }    

        // Add overlay.
        if (props.overlayAnimation == true) {
            // NOTE: If you set this value manually, text must be HTML escaped.
            this.widget.addFragment(this.innerBarOverlayContainer, this.progress + "%");
            this.common.setVisibleElement(this.innerBarOverlayContainer, true);
        }

        // Add log.
        if (props.log != null && props.overlayAnimation == false) { 
            this.widget.addFragment(this.logContainer, props.log);
            this.common.setVisibleElement(this.logContainer, true);
        }  
    } else if (props.type == this.indeterminate) {
        // Set style class.
        this.barContainer.className = 
            this.theme.getClassName("PROGRESSBAR_CONTAINER");
        this.innerBarContainer.className = 
            this.theme.getClassName("PROGRESSBAR_INDETERMINATE");
    } else if (props.type == this.busy) {
        // Add busy image.
        if (props.busyImage) {
            if (props.width > 0) {
                props.busyImage.width = props.width;
            } 
            if (props.height > 0) {
                props.busyImage.height = props.height;
            }
            this.widget.addFragment(this.busyImageContainer, props.busyImage);
            this.common.setVisibleElement(this.busyImageContainer, true);
        }
    }

    // Set developer specified image.
    if (props.progressImageUrl != null ) {
        this.innerBarContainer.style.backgroundImage = 'url(' + props.progressImageUrl + ')';
    }

    // Set A11Y properties.
    if (props.progress != null) {
        if (this.bottomTextContainer.setAttributeNS) {
            this.bottomTextContainer.setAttributeNS(
                "http://www.w3.org/2005/07/aaa", "valuenow", this.progress);
        }
    }

    // Set more properties.
    this.setCommonProps(this.domNode, props);

    // Set remaining properties.
    return this.inherited("_setProps", arguments);
};

/**
 * This method hides the Right Control.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setRightControlVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this.rightControlsContainer, show);
    return true;
};

/**
 * This method hides the status text.
 *
 * @param {boolean} show true to show the element, false to hide the element.
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.setStatusTextVisible = function(show) {
    if (show == null) {
        return false;
    }
    this.common.setVisibleElement(this.bottomTextContainer, show);
    return true;
};

/**
 * This function is used to "start" the widget, after the widget has been
 * instantiated.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.startup = function () {
    if (this._started) {
        return false;
    }
    // Start a timer used to periodically publish progress events.
    this.updateProgress();  
    return this.inherited("startup", arguments);
};

/**
 * This function handles stop button event.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.stop = function() {
    clearTimeout(this.timeoutId);

    this.hiddenFieldNode.value = this.stopped;
    if (this.type == this.indeterminate) {
        this.innerBarIdContainer.className =
            this.theme.getClassName("PROGRESSBAR_INDETERMINATE_PAUSED");
    }
    return this.updateProgress();
};

/**
 * Process progress event.
 *
 * @return {boolean} true if successful; otherwise, false.
 */
webui.@THEME@.widget.progressBar.prototype.updateProgress = function() {
    // Publish event.
    if (this.refreshRate > 0) {
        // Publish an event for custom AJAX implementations to listen for.
        this.publish(webui.@THEME@.widget.progressBar.event.progress.beginTopic, [{
            id: this.id
        }]);
    }

    // Create a call back function to periodically publish progress events.
    var _id = this.id;
    this.timeoutId = setTimeout(function() {
        // New literals are created every time this function is called, and it's 
        // saved by closure magic.
        webui.@THEME@.dijit.byId(_id).updateProgress();
    }, this.refreshRate);
    return true;
};
