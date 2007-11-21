// widget/jsfx/common.js
//
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

dojo.provide("webui.@THEME@.widget.jsfx.common");

/**
 * @class This class contains functions to obtain data asynchronously using JSF
 * Extensions as the underlying transfer protocol.
 * @static
 */
webui.@THEME@.widget.jsfx.common = {
    /**
     * This function is used to process refresh events with Object literals.
     *
     * @param props Key-Value pairs of properties.
     * @config {String} id The HTML element Id.
     * @config {String} endTopic The event topic to publish.
     * @config {String} execute The string containing a comma separated list 
     * of client ids against which the execute portion of the request 
     * processing lifecycle must be run.
     * @return {boolean} true if successful; otherwise, false.
     */
    processRefreshEvent: function(props) {
        if (props == null) {
            return false;
        }

        // Dynamic Faces requires a DOM node as the source property.
        var domNode = document.getElementById(props.id);

        // Generate AJAX request using the JSF Extensions library.
        DynaFaces.fireAjaxTransaction(
            (domNode) ? domNode : document.forms[0], {
            execute: (props.execute) ? props.execute : "none",
            render: props.id,
            replaceElement: webui.@THEME@.widget.jsfx.common.refreshCallback,
            xjson: {
                id: props.id,
                endTopic: props.endTopic,
                event: "refresh"
            }
        });
        return true;
    },

    /**
     * This function is used to process state change events with Object literals.
     *
     * @param props Key-Value pairs of properties.
     * @config {String} id The HTML element Id.
     * @config {String} endTopic The event topic to publish.
     * @config {Object} props Key-Value pairs of widget properties to update.
     * @return {boolean} true if successful; otherwise, false.
     */
    processStateEvent: function(props) {
        if (props == null) {
            return false;
        }

        // Dynamic Faces requires a DOM node as the source property.
        var domNode = document.getElementById(props.id);

        // Generate AJAX request using the JSF Extensions library.
        DynaFaces.fireAjaxTransaction(
            (domNode) ? domNode : document.forms[0], {
            render: props.id,
            replaceElement: webui.@THEME@.widget.jsfx.common.stateCallback,
            xjson: {
                id: props.id,
                endTopic: props.endTopic,
                event: "state",
                props: props.props // Widget properties to update.
            }
        });
        return true;
    },

    /**
     * This function is used to process submit events with Object literals.
     *
     * @param props Key-Value pairs of properties.
     * @config {String} id The HTML element Id.
     * @config {String} endTopic The event topic to publish.
     * @config {String} execute The string containing a comma separated list 
     * of client ids against which the execute portion of the request 
     * processing lifecycle must be run.
     * @return {boolean} true if successful; otherwise, false.
     */
    processSubmitEvent: function(props) {
        if (props == null) {
            return false;
        }

        // Dynamic Faces requires a DOM node as the source property.
        var domNode = document.getElementById(props.id);

        // Generate AJAX request using the JSF Extensions library.
        DynaFaces.fireAjaxTransaction(
            (domNode) ? domNode : document.forms[0], {
            execute: (props.execute) ? props.execute : props.id,
            render: props.id,
            replaceElement: webui.@THEME@.widget.jsfx.common.submitCallback,
            xjson: {
                id: props.id,
                endTopic: props.endTopic,
                event: "submit"
            }
        });
        return true;
    }, 
   
    /**
     * This function is used to refresh widgets.
     *
     * @param {String} elementId The HTML element Id.
     * @param {String} content The content returned by the AJAX response.
     * @param {Object} closure The closure argument provided to DynaFaces.fireAjaxTransaction.
     * @param {Object} xjson The xjson argument provided to DynaFaces.fireAjaxTransaction.
     * @return {boolean} true if successful; otherwise, false.
     */
    refreshCallback: function(id, content, closure, xjson) {
        if (id == null || content == null) {
            return false;
        }

        // Parse JSON text.
        var props = JSON.parse(content);

        // Add rows.
        var widget = dijit.byId(id);
        widget.setProps(props);

        // Publish an event for custom AJAX implementations to listen for.
        if (xjson.endTopic) {
            dojo.publish(xjson.endTopic, [props]);
        }
        return true;
    },

    /**
     * This function is a callback to respond to the end of state request.
     * It will only publish submit end event without updating the widget itself.
     *
     * @param {String} elementId The HTML element Id.
     * @param {String} content The content returned by the AJAX response.
     * @param {Object} closure The closure argument provided to DynaFaces.fireAjaxTransaction.
     * @param {Object} xjson The xjson argument provided to DynaFaces.fireAjaxTransaction.
     * @return {boolean} true if successful; otherwise, false.
     */
    stateCallback: function(id, content, closure, xjson) {
        if (id == null || content == null) {
            return false;
        }

        // Parse JSON text.
        var props = JSON.parse(content);
            
        // Publish an event for custom AJAX implementations to listen for.
        if (xjson.endTopic) {
            dojo.publish(xjson.endTopic, [props]);
        }
        return true;
    },

    /**
     * This function is a callback to respond to the end of submit request.
     * It will only publish submit end event without updating the widget itself.
     *
     * @param {String} elementId The HTML element Id.
     * @param {String} content The content returned by the AJAX response.
     * @param {Object} closure The closure argument provided to DynaFaces.fireAjaxTransaction.
     * @param {Object} xjson The xjson argument provided to DynaFaces.fireAjaxTransaction.
     * @return {boolean} true if successful; otherwise, false.
     */
    submitCallback: function(id, content, closure, xjson) {
        if (id == null || content == null) {
            return false;
        }

        // Parse JSON text.
        var props = JSON.parse(content);
            
        // Publish an event for custom AJAX implementations to listen for.
        if (xjson.endTopic) {
            dojo.publish(xjson.endTopic, [props]);
        }
        return true;
    }
}
