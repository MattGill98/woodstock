/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2007-2018 Oracle and/or its affiliates. All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common Development
 * and Distribution License("CDDL") (collectively, the "License").  You
 * may not use this file except in compliance with the License.  You can
 * obtain a copy of the License at
 * https://oss.oracle.com/licenses/CDDL+GPL-1.1
 * or LICENSE.txt.  See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the License file at LICENSE.txt.
 *
 * GPL Classpath Exception:
 * Oracle designates this particular file as subject to the "Classpath"
 * exception as provided by Oracle in the GPL Version 2 section of the License
 * file that accompanied this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 * Contributor(s):
 * If you wish your version of this file to be governed by only the CDDL or
 * only the GPL Version 2, indicate your decision by adding "[Contributor]
 * elects to include this software in this distribution under the [CDDL or GPL
 * Version 2] license."  If you don't indicate a single choice of license, a
 * recipient has the option to distribute your version of this file under
 * either the CDDL, the GPL Version 2 or to extend the choice of license to
 * its licensees as provided above.  However, if you add GPL Version 2 code
 * and therefore, elected the GPL Version 2 license, then the option applies
 * only if the new code is made subject to such option by the copyright
 * holder.
 */

package com.sun.webui.jsf.model;

import javax.faces.model.SelectItem;

/**
 * <p>Model bean that represents a selectable choice in a selection
 * component such as <code>Menu</code>, <code>RadioButtonGroup</code>,
 * etc.
 * </p>
 */
public class Option extends SelectItem {

    private static final long serialVersionUID = -2164172320702956584L;
    private String image;
    // Zero is a valid width and height
    //
    private int imageWidth = -1;
    private int imageHeight = -1;
    private String imageAlt;
    private String tooltip;

    /**
     * Create an instance of Selection.
     */
    public Option() {
        super();
    }

    /**
     * Create an instance of Selection.
     */
    public Option(Object value) {
        super(value, null);
    }

    /**
     * Create an instance of Selection.
     */
    public Option(Object value, String label) {
        super(value, label);
    }

    /**
     * Create an instance of Selection.
     */
    public Option(Object value, String label, String description) {
        super(value, label, description);
    }

    /**
     * Create an instance of Selection.
     */
    public Option(Object value, String label, String description, boolean disabled) {
        super(value, label, description, disabled);
    }

    /**
     * Get the image resource path.
     */
    public String getImage() {
        return image;
    }

    /**
     * Set an image resource path
     * Used for an image in a radio button for example.
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * Get the image width.
     */
    public int getImageWidth() {
        return imageWidth;
    }

    /**
     * Set an image resource path
     * Used for an image in a radio button for example.
     */
    public void setImageWidth(int imageWidth) {
        this.imageWidth = imageWidth;
    }

    /**
     * Get the image height.
     */
    public int getImageHeight() {
        return imageHeight;
    }

    /**
     * Set an image resource path
     * Used for an image in a radio button for example.
     */
    public void setImageHeight(int imageHeight) {
        this.imageHeight = imageHeight;
    }

    /**
     * Get the alternate text for the image.
     */
    public String getImageAlt() {
        return imageAlt;
    }

    /**
     * Set the alternate text for the image.
     */
    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    /**
     * Get the tooltip for this instance.
     */
    public String getTooltip() {
        return tooltip;
    }

    /**
     * Set the tooltip for this instance.
     */
    public void setTooltip(String tooltip) {
        this.tooltip = tooltip;
    }
}
