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

webui.@THEME_JS@._base.dojo.provide("webui.@THEME_JS@.widget._base.labeledBase");

/**
 * This function is used to construct a base class.
 *
 * @name webui.@THEME_JS@.widget._base.labeledBase
 * @extends webui.@THEME_JS@.widget._base.widgetBase
 * @class This class defines functions and properties 
 * for widgets that have label subcomponents and implements 
 * the <code>required</code> and <code>valid</code> properties which
 * control the indicators on the label.
 *
 * <h3>Dojo attach points</h3>
 * A <code>labeledBase</code> subclass's templates are expected to
 * define following attachpoint identifiers.
 * <ul>
 * <li>labelContainer - the attachpoint for the label. (mandatory)</li>
 * <li>brNode - the attachpoint for a <code>br</code> element to
 * implement <code>labelOnTop</code> behavior. (optional)</li>
 * </ul>
 * </p>
 * <h3>The <code>label</code> object property</h3>
 * The <code>label</code> property is an object that defines the properties
 * for a widget that is rendered to represent a label. Minimally, only the
 * <code>value</code> property of the label object property must be non 
 * null for <code>labeledBase</code> to render a label. If only the
 * <code>value</code> property is specified the following default
 * values will be used to create an instance of 
 * <code>webui.@THEME_JS@.widget.label</code>.
 * <p>
 * <ul>
 * <li><code>widgetType</code> -
 * <code>webui.@THEME_JS@.widget.label</code></li>
 * <li><code>id</code> - this.id + "_label"</li>
 * <li><code>htmlFor</code> - this.listContainer.id</li>
 * </ul>
 * <p>See <code>_postCreate</code> and <code>_getLabelProps</code>
 * </p>
 * <p>
 * This class is meant to be subclassed and not instantiated.
 * Therefore it has no widget name.
 * </p>
 * @param {Object} props Key-Value pairs of properties.
 * @config {boolean} required If true the widget that is labeled requires
 * input. If no input is provided an indicator will appear near the label.
 * @config {boolean} valid If true the widget that is labeled has valid 
 * input. If false an indicator will appear near the label.
 * @config {boolean} labelOnTop If true the label appears above the
 * widget that is labeled.
 * @constructor
 */
webui.@THEME_JS@._base.dojo.declare("webui.@THEME_JS@.widget._base.labeledBase",
        webui.@THEME_JS@.widget._base.widgetBase, {
    // Set defaults.
    constructor: function() {
	// If true the label appears above the owning widget.
	this.lableOnTop = false,
	// If true an indicator appears near the label to indicate input
	// for the labeled widget is required.
	this.required = false;
	// If false an indicator appears near the label to indicate input
	// for the labeled widget is invalid.
	this.valid = true;

	// Private flag to remember that last label style class.
	this._lastLabelOnTopClassName =  null;
    }
});

/**
 * This function is used to get widget properties. Please see the constructor 
 * detail for a list of supported properties.
 *
 * @return {Object} Key-Value pairs of properties.
 */
webui.@THEME_JS@.widget._base.labeledBase.prototype.getProps = function() {
    var props = this._inherited("getProps", arguments);

    if (this.label != null) { props.label = this.label; };
    if (this.labelOnTop != null) { props.labelOnTop = this.labelOnTop; };
    if (this.required != null) { props.required = this.required; };
    if (this.valid != null) { props.valid = this.valid; };

    return props;
};

/**
 * Return label properties desired by this widget.
 * <p>
 * This implementation returns null. This method should be implemented
 * in subclasses to return label properties desired by the subclass.
 * </p>
 * @return {Object} Key-Value pairs of properties.
 * @private
 */
webui.@THEME_JS@.widget._base.labeledBase.prototype._getLabelProps = function() {
    return {};
};

/**
 * Return a CSS selector to be used for the label widget.
 * <p>
 * This implementation returns null. This method should be implemented
 * in subclasses to return the appropriate selector desired by the subclass.
 * </p>
 * @param {boolean} ontop If <code>ontop</code> is true, return the selector
 * for the label when the label is "ontop", else return the selector for the
 * label when it is not "ontop".
 * @return {String} This implementation returns null;
 * @private
 */
webui.@THEME_JS@.widget._base.labeledBase.prototype._getLabelClassName = function(ontop) {
    return null;
};

/**
 * This function is used to fill in remaining template properties, after the
 * _buildRendering() function has been processed.
 * <p>
 * Note: Unlike Dojo 0.4, the DOM nodes don't exist in the document, yet. 
 * </p>
 * @return {boolean} true if successful; otherwise, false.
 * @private
 */
webui.@THEME_JS@.widget._base.labeledBase.prototype._postCreate = function () {
    // A widget that has inherited from labeledBase must have
    // "this.labelContainer", but check anyway.
    //
    if (!this.labelContainer) {
       return this._inherited("_postCreate", arguments);
    }

    // We should probably set and id anyway, even if it is just "_label".
    //
    if (this.id) {
	this.labelContainer.id = this.id + "_label";
    }

    // If the application is creating a label on construction
    // this.label will be non-null. If it is a widget fragment 
    // (provides a widgetType and an id) then assum it is fully
    // configured. If it is not a fragment then get the desired
    // label properties to create the widget.
    // 
    if (this.label && this.label.value != null
            && !this._widget._isFragment(this.label)) {
	this.label.id = this.id + "_label";
        this.label.widgetType = "label";

	// Get subclass label preferences
	//
	this._proto._extend(this.label, this._getLabelProps());
    }
    return this._inherited("_postCreate", arguments);
};

/**
 * This function is used to set widget properties. Please see the constructor 
 * detail for a list of supported properties.
 * <p>
 * Note: This function should only be invoked through setProps().
 * </p>
 * @param {Object} props Key-Value pairs of properties.
 * @return {boolean} true if successful; otherwise, false.
 * @private
 */
webui.@THEME_JS@.widget._base.labeledBase.prototype._setProps = function(props) {
    if (props == null) {
        return false;
    }

    // Always update the brNode state, even if there isn't a label.
    // If there is no brNode the subclass does not support labelOnTop.
    //
    if (this.brNode && props.labelOnTop != null) {
	this._common._setVisibleElement(this.brNode, props.labelOnTop);

	// Always remove the last label on top selector.
	// 
	this._common._stripStyleClass(this.labelContainer,
	    this._lastLabelOnTopClassName);

	// Get the label selector from the subclass
	// and remember the new ontop selector.
	//
	this._lastLabelOnTopClassName = 
	    this._getLabelClassName(props.labelOnTop);

	// Add the "ontop" selector.
	//
	this._common._addStyleClass(this.labelContainer,
	    this._lastLabelOnTopClassName);
    }

    // Cases:
    // - called from _postCreate
    //   + creating a label
    //       this.label and this.label.id will not be null,
    //       props.label will not be null
    //   + no label
    //       this.label and this.label.id and props.label will be null
    //
    // - called from setProps
    //   + creating a label 
    //       same as called from _postCreate
    //   + updating a label (label subcomponent must exist)
    //       props.label and this.label and this.label.id will not be null
    //   + updating the widget's required or valid properties
    //       props.label may be null, this.label and this.label.id will
    //       not be null because there must be can existing label
    //       subcomponent.
    //
    // If the label is being updated then props.label will not be null
    // and hence "this.label" will not be null, but "this.label.id"
    // may be null if there is no existing subcomponent label and props is 
    // "{ label : { value : 'foo'}}" i.e. no id is specified.
    // 
    if (this.label != null && this.label.id != null && (props.label != null 
            || props.required != null || props.valid != null)) {

	// Make sure we have an object to hang properties on.
	// This is the case where the widget's "required" and "valid"
	// properties are being updated.
	//
	if (props.label == null) {
	    props.label = {};
	}
	if (props.required != null) {
	    props.label.required = props.required;
	}
	if (props.valid != null) {
	    props.label.valid = props.valid;
	}

	this._widget._updateFragment(this.labelContainer, this.label.id,
            props.label);
    }

    // Set more properties.
    return this._inherited("_setProps", arguments);
};
