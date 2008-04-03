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

webui.@THEME_JS@._base.dojo.provide("webui.@THEME_JS@.widget._jsfx.rating");

webui.@THEME_JS@._base.dojo.require("webui.@THEME_JS@.widget.common");
webui.@THEME_JS@._base.dojo.require("webui.@THEME_JS@.widget._jsfx.common");
webui.@THEME_JS@._base.dojo.require("webui.@THEME_JS@.widget._jsfx.dynaFaces")
webui.@THEME_JS@._base.dojo.require("webui.@THEME_JS@.widget.rating");

/**
 * @class This class contains functions to obtain data asynchronously using JSF
 * Extensions as the underlying transfer protocol.
 * @static
 * @private
 */
webui.@THEME_JS@.widget._jsfx.rating = {
    /**
     * This function is a callback to respond to the end of submit request.
     *
     * @param {String} elementId The HTML element Id.
     * @param {String} content The content returned by the AJAX response.
     * @param {Object} closure The closure argument provided to DynaFaces.fireAjaxTransaction.
     * @param {Object} xjson The xjson argument provided to DynaFaces.fireAjaxTransaction.
     * @return {boolean} true if successful; otherwise, false.
     * @private
     */
    _submitCallback: function(id, content, closure, xjson) {
        if (id == null || content == null) {
            return false;
        }

        // Parse JSON text.
        var props = webui.@THEME_JS@.json.parse(content);

        // Update rating widget
        var widget = webui.@THEME_JS@.widget.common.getWidget(id);
        widget.setProps(props);
            
        // Publish an event for custom AJAX implementations to listen for.
        if (xjson.endTopic) {
            webui.@THEME_JS@._base.dojo.publish(xjson.endTopic, [props]);
        }
        return true;
    },

    /**
     * This function is used to process submit events with Object literals. 
     * <p>
     * Note: Cannot use the _processSubmitEvent() function in the common.js file
     * as we need to override "replaceElement" with a callback functiont o receive
     * the response.
     * </p>
     *
     * @param props Key-Value pairs of properties.
     * @config {String} id The HTML element Id.
     * @config {String} endTopic The event topic to publish.
     * @config {String} execute The string containing a comma separated list 
     * of client ids against which the execute portion of the request 
     * processing lifecycle must be run.
     * @return {boolean} true if successful; otherwise, false.
     * @private
     */
    _processSubmitEvent: function(props) {
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
            replaceElement: webui.@THEME_JS@.widget._jsfx.rating._submitCallback,
            xjson: {
                id: props.id,
                endTopic: props.endTopic,
                event: "submit"
            }
        });
        return true;
    }
}

// Listen for Dojo Widget events.
webui.@THEME_JS@._base.dojo.subscribe(webui.@THEME_JS@.widget.rating.event.refresh.beginTopic,
    webui.@THEME_JS@.widget._jsfx.common, "_processRefreshEvent");
webui.@THEME_JS@._base.dojo.subscribe(webui.@THEME_JS@.widget.rating.event.submit.beginTopic,
    webui.@THEME_JS@.widget._jsfx.rating, "_processSubmitEvent");