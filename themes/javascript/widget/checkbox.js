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

dojo.provide("webui.@THEME@.widget.checkbox");

dojo.require("dojo.widget.*");
dojo.require("webui.@THEME@.*");
dojo.require("webui.@THEME@.widget.*");

/**
 * This function will be invoked when creating a Dojo widget. Please see
 * webui.@THEME@.widget.checkbox.setProps for a list of supported
 * properties.
 *
 * Note: This is considered a private API, do not use.
 */
webui.@THEME@.widget.checkbox = function() {
    // Set defaults.
    this.widgetType = "checkbox";

    // Register widget.
    dojo.widget.Widget.call(this);

    /**
     * This function is used to generate a template based widget.
     */
    this.fillInTemplate = function() {
        // Set ids.
        if (this.id) {
            this.checkboxNode.id = this.id + "_cb";
            this.imageContainer.id = this.id + "_imageContainer";
            this.labelContainer.id = this.id + "_labelContainer";
        }

        // Set public functions.        
        this.domNode.setProps = function(props) { return dojo.widget.byId(this.id).setProps(props); }
        this.domNode.getProps = function() { return dojo.widget.byId(this.id).getProps(); } 
        this.domNode.getInputElement = function() { return dojo.widget.byId(this.id).getInputElement(); }

        // Set private functions.
        this.getClassName = webui.@THEME@.widget.checkbox.getClassName;
        this.setProps = webui.@THEME@.widget.checkbox.setProps;
        this.getProps = webui.@THEME@.widget.checkbox.getProps;
        this.getInputElement = webui.@THEME@.widget.checkbox.getInputElement;        

        // Set properties
        this.setProps(this);
        return true;
    }
}

/**
 * Helper function to obtain widget class names.
 */
webui.@THEME@.widget.checkbox.getClassName = function() {
    // Set style for the outermost span element.
    var spanStyleClass = webui.@THEME@.widget.props.checkbox.spanClassName; 
    if (this.disabled == true) {
        spanStyleClass = webui.@THEME@.widget.props.checkbox.spanDisabledClassName;
    }
    return (this.className) 
        ? this.className + " " + spanStyleClass
        : spanStyleClass;
}

/**
 * Returns the HTML input element that makes up the chekcbox.
 *
 * @return a reference to the HTML input element. 
 */
webui.@THEME@.widget.checkbox.getInputElement = function() {
    return this.checkboxNode;
}

/**
 * This function is used to get widget properties. Please see
 * webui.@THEME@.widget.checkbox.setProps for a list of supported
 * properties.
 */
webui.@THEME@.widget.checkbox.getProps = function() {
    var props = {};

    // Set properties.  
    if (this.align) { props.align = this.align; }
    if (this.checked != null) { props.checked = this.checked; }
    if (this.disabled != null) { props.disabled = this.disabled; }   
    if (this.image) { props.image = this.image; }
    if (this.label) { props.label = this.label; }
    if (this.name) { props.name = this.name; }        
    if (this.readOnly != null) { props.readOnly = this.readOnly; }
    if (this.value) { props.value = this.value; }
         
    // Add DOM node properties.
    Object.extend(props, webui.@THEME@.widget.common.getCommonProps(this));
    Object.extend(props, webui.@THEME@.widget.common.getCoreProps(this));
    Object.extend(props, webui.@THEME@.widget.common.getJavaScriptProps(this));
 
    return props;
}

/**
 * This function is used to set widget properties with the
 * following Object literals.
 *
 * <ul>
 *  <li>accesskey</li>
 *  <li>align</li>
 *  <li>checked</li>
 *  <li>className</li>
 *  <li>dir</li>
 *  <li>disabled</li>
 *  <li>id</li>
 *  <li>image</li>
 *  <li>label</li>
 *  <li>lang</li>
 *  <li>name</li>
 *  <li>onFocus</li>
 *  <li>onBlur</li>
 *  <li>onChange</li>
 *  <li>onClick</li>
 *  <li>onDblClick</li>
 *  <li>onKeyDown</li>
 *  <li>onKeyPress</li>
 *  <li>onKeyUp</li>
 *  <li>onMouseDown</li>
 *  <li>onKeyPress</li>
 *  <li>onKeyUp</li>
 *  <li>onMouseOut</li>
 *  <li>onMouseOver</li>
 *  <li>onMouseUp</li>
 *  <li>onMouseMove</li>
 *  <li>onSelect</li>
 *  <li>readOnly</li>
 *  <li>style</li>
 *  <li>tabIndex</li>
 *  <li>title</li>
 *  <li>value</li>
 *  <li>visible</li>
 * </ul>
 *
 * @param props Key-Value pairs of properties.
 */
webui.@THEME@.widget.checkbox.setProps = function(props) {
    if (props == null) {
        return false;
    }

    // After widget has been initialized, save properties for later updates.
    if (this.updateProps == true) {
        webui.@THEME@.widget.common.extend(this, props);    
    }
    // Set flag indicating properties can be updated.
    this.updateProps = true;
      
    // Set style class before calling setCoreProps.
    props.className = this.getClassName();

    // Set DOM node core attributes.    
    webui.@THEME@.widget.common.setCoreProps(this.domNode, props);               
            
    // Set checkbox attributes.    
    webui.@THEME@.widget.common.setCommonProps(this.checkboxNode, props);
    webui.@THEME@.widget.common.setJavaScriptProps(this.checkboxNode, props); 

    if (props.value) { this.checkboxNode.setAttribute("value", props.value); }
    if (props.readOnly != null) { 
        if (props.readOnly == true) { 
            this.checkboxNode.setAttribute("readonly", "readonly");
        } else {
            this.checkboxNode.removeAttribute("readonly");
        }
    }
    if (props.checked != null) { 
        if (props.checked == true) {
            this.checkboxNode.setAttribute("checked", "checked");
        } else {
            this.checkboxNode.removeAttribute("checked");
        }
    }
    if (props.disabled != null) { 
        if (props.disabled == true) {
            this.checkboxNode.setAttribute("disabled", "disabled");        
        } else {
            this.checkboxNode.removeAttribute("disabled");
        }
    }

    // Set name -- If it's null, use HTML input element's id.
    if (props.name) {
        this.checkboxNode.setAttribute("name", (props.name != null) 
            ? props.name 
            : this.checkboxNode.id);
    }      	
    
    // Set image widget properties.
    if (props.image || props.disabled != null) {
        // Ensure property exists so we can call setProps just once.
        if (props.image == null) {
            props.image = {};
        }
        
        // Set class name based on the disabled state of the checkbox widget.
        props.image.className = (props.disabled == true) 
            ? webui.@THEME@.widget.props.checkbox.imageDisabledClassName
            : webui.@THEME@.widget.props.checkbox.imageClassName;        

        // Update widget/add fragment.                
        var imageWidget = dojo.widget.byId(this.image.id);
        if (imageWidget) {
            imageWidget.setProps(props.image);
        } else {
            webui.@THEME@.widget.common.addFragment(this.imageContainer, props.image);
        }        
    }   

    // Set label widget properties.
    if (props.label || props.disabled != null) {
        // Ensure property exists so we can call setProps just once.
        if (props.label == null) {
            props.label = {};
        }
        
        // Set class name for label based on the disabled state of the checkbox widget.
        props.label.className = (props.disabled == true)
            ? webui.@THEME@.widget.props.checkbox.labelDisabledClassName
            : webui.@THEME@.widget.props.checkbox.labelClassName;        

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

dojo.inherits(webui.@THEME@.widget.checkbox, dojo.widget.HtmlWidget);

//-->
