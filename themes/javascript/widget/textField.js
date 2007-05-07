//<!--
// The contents of this file are subject to the terms
// of the Common Development and Distribution License
// (the License).  You may not use this file except in
// compliance with the License.
// 
// You can obtain a copy of the license at
// https://woodstock.dev.java.net/public/CDDLv1.0.html.
// See the License for the specific language governing
// permissions and limitations under the License.
// 
// When distributing Covered Code, include this CDDL
// Header Notice in each file and include the License file
// at https://woodstock.dev.java.net/public/CDDLv1.0.html.
// If applicable, add the following below the CDDL Header,
// with the fields enclosed by brackets [] replaced by
// you own identifying information:
// "Portions Copyrighted [year] [name of copyright owner]"
// 
// Copyright 2007 Sun Microsystems, Inc. All rights reserved.
//

dojo.provide("webui.@THEME@.widget.textField");

dojo.require("dojo.widget.*");
dojo.require("webui.@THEME@.*");
dojo.require("webui.@THEME@.widget.*");

/**
 * This function will be invoked when creating a Dojo widget. Please see
 * webui.@THEME@.widget.textField.setProps for a list of supported
 * properties.
 *
 * Note: This is considered a private API, do not use.
 */
webui.@THEME@.widget.textField = function() {
    // Set defaults.
    this.disabled   = false;
    this.required   = false;
    this.size       = 20;
    this.valid      = true;
    this.widgetType = "textField";
    
    // Register widget.
    dojo.widget.Widget.call(this);
    
    /**
     * This function is used to generate a template based widget.
     */
    this.fillInTemplate = function() {
        // Set ids.
        if (this.id) {
            this.labelContainer.id = this.id + "_label";
            this.textFieldNode.id = this.id + "_field";
            this.textFieldNode.name = this.id + "_field";
        }
        
        // Set public functions.
        this.domNode.getInputElement = function() { return dojo.widget.byId(this.id).getInputElement(); }
        this.domNode.getProps = function() { return dojo.widget.byId(this.id).getProps(); }
        this.domNode.refresh = function(execute) { return dojo.widget.byId(this.id).refresh(execute); }
        this.domNode.submit = function(execute) { return dojo.widget.byId(this.id).submit(execute); }
        this.domNode.setProps = function(props) { return dojo.widget.byId(this.id).setProps(props); }
        
        // Set private functions.
        this.getInputElement = webui.@THEME@.widget.textField.getInputElement;
        this.getClassName = webui.@THEME@.widget.textField.getClassName;
        this.getProps = webui.@THEME@.widget.textField.getProps;
        this.refresh = webui.@THEME@.widget.textField.refresh.processEvent;
        this.submit = webui.@THEME@.widget.textField.submit.processEvent;
        this.setProps = webui.@THEME@.widget.textField.setProps;

        // Set events.
        if (this.autoValidate == true) {
            // Generate the following event ONLY when 'autoValidate' == true.
            dojo.event.connect(this.textFieldNode, "onblur", 
                webui.@THEME@.widget.textField.validation.processEvent);
        }

        // Set properties.
        return this.setProps();
    }
}

/**
 * Helper function to obtain widget class names.
 */
webui.@THEME@.widget.textField.getClassName = function() {
    // Set default style.    
    var className = (this.disabled == true)
        ? webui.@THEME@.widget.props.textField.disabledClassName
        : webui.@THEME@.widget.props.textField.className;
    
    return className;
}

/**
 * Returns the HTML input element that makes up the text field.
 *
 * @return a reference to the HTML input element. 
 */
webui.@THEME@.widget.textField.getInputElement = function() {
    return this.textFieldNode;
}

/**
 * This function is used to get widget properties. 
 * @see webui.@THEME@.widget.textField.setProps for a list of supported
 * properties.
 */
webui.@THEME@.widget.textField.getProps = function() {
    var props = {};
    
    // Set properties.
    if (this.alt) { props.alt = this.alt; }
    if (this.disabled != null) { props.disabled = this.disabled; }
    if (this.label) { props.label= this.label; }
    if (this.text) { props.text = this.text; }
    if (this.title) { props.title = this.title; }
    if (this.type) { props.type= this.type; }
    if (this.readOnly != null) { props.readOnly = this.readOnly; }
    if (this.required != null) { props.required = this.required; }
    if (this.size) { props.size = this.size; }
    if (this.valid != null) { props.valid = this.valid; }
    if (this.autoValidate != null) { props.autoValidate = this.autoValidate; }
    if (this.style != null) { props.style = this.style; }

    // After widget has been initialized, get user's input.
    if (webui.@THEME@.widget.common.isWidgetInitialized(this) == true 
            && this.textFieldNode.value != null) {
        props.value = this.textFieldNode.value;
    } else if (this.value != null) {
        props.value = this.value;
    }

    // Add DOM node properties.
    Object.extend(props, webui.@THEME@.widget.common.getCommonProps(this));
    Object.extend(props, webui.@THEME@.widget.common.getCoreProps(this));
    Object.extend(props, webui.@THEME@.widget.common.getJavaScriptProps(this));

    return props;
}

/**
 * This closure is used to process refresh events.
 */
webui.@THEME@.widget.textField.refresh = {
    /**
     * Event topics for custom AJAX implementations to listen for.
     */
    beginEventTopic: "webui_@THEME@_widget_textField_refresh_begin",
    endEventTopic: "webui_@THEME@_widget_textField_refresh_end",
 
    /**
     * Process refresh event.
     *
     * @param execute Comma separated string containing a list of client ids 
     * against which the execute portion of the request processing lifecycle
     * must be run.
     */
    processEvent: function(execute) {
        // Publish event.
        webui.@THEME@.widget.textField.refresh.publishBeginEvent({
            id: this.id,
            execute: execute
        });
        return true;
    },

    /**
     * Publish an event for custom AJAX implementations to listen for.
     *
     * @param props Key-Value pairs of properties of the widget.
     */
    publishBeginEvent: function(props) {
        dojo.event.topic.publish(webui.@THEME@.widget.textField.refresh.beginEventTopic, props);
        return true;
    },

    /**
     * Publish an event for custom AJAX implementations to listen for.
     *
     * @param props Key-Value pairs of properties of the widget.
     */
    publishEndEvent: function(props) {
        dojo.event.topic.publish(webui.@THEME@.widget.textField.refresh.endEventTopic, props);
        return true;
    }
}

/**
 * This function is used to set widget properties with the
 * following Object literals.
 *
 * <ul>
 *  <li>accesskey</li>
 *  <li>className</li>
 *  <li>dir</li>
 *  <li>disabled</li>
 *  <li>id</li>
 *  <li>label</li>
 *  <li>lang</li>
 *  <li>onClick</li>
 *  <li>onDblClick</li>
 *  <li>onFocus</li>
 *  <li>onKeyDown</li>
 *  <li>onKeyPress</li>
 *  <li>onKeyUp</li>
 *  <li>onMouseDown</li>
 *  <li>onMouseOut</li>
 *  <li>onMouseOver</li>
 *  <li>onMouseUp</li>
 *  <li>onMouseMove</li>
 *  <li>readOnly</li>
 *  <li>required</li>
 *  <li>size</li>
 *  <li>style</li>
 *  <li>tabIndex</li>
 *  <li>title</li>
 *  <li>valid</li>
 *  <li>value</li>
 *  <li>visible</li> 
 * </ul>
 *
 * @param props Key-Value pairs of properties.
 */
webui.@THEME@.widget.textField.setProps = function(props) {   
    // Save properties for later updates.
    if (props != null) {
        webui.@THEME@.widget.common.extend(this, props);
    } else {
        props = this.getProps(); // Widget is being initialized.
    }
    
    // Set attributes.  
    webui.@THEME@.widget.common.setCoreProps(this.domNode, props);
    webui.@THEME@.widget.common.setCommonProps(this.textFieldNode, props);
    webui.@THEME@.widget.common.setJavaScriptProps(this.textFieldNode, props);
    
    // Set text field attributes.    
    if (props.size) { this.textFieldNode.size = props.size; }
    if (props.value) { this.textFieldNode.value = props.value; }
    if (props.title) { this.textFieldNode.title = props.title; }   
    if (props.disabled != null) { 
        this.textFieldNode.disabled = new Boolean(props.disabled).valueOf();
    }
    if (props.readOnly != null) { 
        this.textFieldNode.readOnly = new Boolean(props.readOnly).valueOf();
    }

    this.textFieldNode.className = this.getClassName();
    
    // Set label properties.
    if (props.label || (props.valid != null || props.required != null) && this.label) {
        // Ensure property exists so we can call setProps just once.
        if (props.label == null) {
            props.label = {};
        }
        
        // Set valid.
        if (props.valid != null) { props.label.valid = props.valid; }
        
        // Set required.
        if (props.required != null) { props.label.required = props.required; }
        
        // Update widget/add fragment.                
        var labelWidget = dojo.widget.byId(this.label.id);
        if (labelWidget) {
            labelWidget.setProps(props.label);
        } else {
            webui.@THEME@.widget.common.addFragment(this.labelContainer, props.label);
        }
    }
    return true;
}


/**
 * This closure is used to publish validation events.
 */
webui.@THEME@.widget.textField.validation = {
    /**
     * Event topics for custom AJAX implementations to listen for.
     */
    beginEventTopic: "webui_@THEME@_widget_textField_validation_begin",
    endEventTopic: "webui_@THEME@_widget_textField_validation_end",
    
    /**
     * Process validation event.
     * This function interprets an event ( one of onXXX events, such as onBlur, etc) and
     * extracts data needed for subsequent ajax request generation - specifically 
     * <ol>
     *  <li>widget id it that has generated the event
     * </ol>
     * if widget id is not found, propagation of the event is stopped, otherwise
     * publishBeginEvent is called with extracted data.
     *
     * @param event Event generated by the widget.
     */
    processEvent: function(event) {
        if (event == null) {
            return false;
        }
        
        // Publish event to retrieve data.
        webui.@THEME@.widget.textField.validation.publishBeginEvent({
            id: event.currentTarget.parentNode.id
        });
    },
    
    /**
     * Publish an event for custom AJAX implementations to listen for.
     *
     * @param event Event generated by the widget.
     */
    publishBeginEvent: function(props) {
        dojo.event.topic.publish(webui.@THEME@.widget.textField.validation.beginEventTopic, props);
        return true;
    },
    
    /**
     * Publish an event for custom AJAX implementations to listen for. For
     * example, an alert component may need to be updated when ever a text
     * field value is found to be invalid.
     *
     * @param props Key-Value pairs of properties of the widget.
     */
    publishEndEvent: function(props) {
        dojo.event.topic.publish(webui.@THEME@.widget.textField.validation.endEventTopic, props);
        return true;
    }
}


/**
 * This closure is used to process submit events.
 */
webui.@THEME@.widget.textField.submit = {
    /**
     * Event topics for custom AJAX implementations to listen for.
     */
    beginEventTopic: "webui_@THEME@_widget_textField_submit_begin",
    endEventTopic: "webui_@THEME@_widget_textField_submit_end",
    
    /**
     * Process submit event.
     *
     * @param execute Comma separated string containing a list of client ids 
     * against which the execute portion of the request processing lifecycle
     * must be run.
     */
    processEvent: function(execute) {
        // Publish event.
        webui.@THEME@.widget.textField.submit.publishBeginEvent({
            id: this.id,
            execute: execute
        });
        return true;
    },
    
    /**
     * Publish an event for custom AJAX implementations to listen for.
     *
     * @param props Key-Value pairs of properties of the widget.
     */
    publishBeginEvent: function(props) {
        dojo.event.topic.publish(webui.@THEME@.widget.textField.submit.beginEventTopic, props);
        return true;
    },
    
    /**
     * Publish an event for custom AJAX implementations to listen for.
     *
     * @param props Key-Value pairs of properties of the widget.
     */
    publishEndEvent: function(props) {
        dojo.event.topic.publish(webui.@THEME@.widget.textField.submit.endEventTopic, props);
        return true;
    }
}


dojo.inherits(webui.@THEME@.widget.textField, dojo.widget.HtmlWidget);

//-->
