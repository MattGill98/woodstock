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

/*
 * $Id: PageRenderer.java,v 1.1.20.1 2009-12-29 04:52:43 jyeary Exp $
 */
package com.sun.webui.jsf.renderkit.html;

import com.sun.faces.annotation.Renderer;
import java.io.IOException;
import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import com.sun.webui.jsf.component.Page;
import com.sun.webui.jsf.util.MessageUtil;
import com.sun.webui.jsf.util.RenderingUtilities;

/**
 * <p>Renderer for a {@link Page} component.</p>
 */
@Renderer(@Renderer.Renders(componentFamily = "com.sun.webui.jsf.Page"))
public class PageRenderer extends javax.faces.render.Renderer {

    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {

        return;
    }

    @Override
    public void encodeBegin(FacesContext context, UIComponent component) throws IOException {

        if (!(component instanceof Page)) {
            Object[] params = {component.toString(),
                this.getClass().getName(),
                Page.class.getName()};
            String message = MessageUtil.getMessage("com.sun.webui.jsf.resources.LogMessages", //NOI18N
                    "Renderer.component", params);              //NOI18N
            throw new FacesException(message);
        }

        Page page = (Page) component;

        ResponseWriter writer = context.getResponseWriter();

        if (!RenderingUtilities.isPortlet(context)) {
            //write the doctype stuff
            if (page.isXhtml()) {
                if (page.isFrame()) {
                    //xhtml transitional frames
                    writer.write("<!DOCTYPE html PUBLIC \"" +
                            "-//W3C//DTD XHTML 1.0 Frameset//EN\" " +
                            "\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\">");
                } else {
                    //html transitional
                    writer.write("<!DOCTYPE html PUBLIC \"" +
                            "-//W3C//DTD XHTML 1.0 Transitional//EN\" " +
                            "\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
                }
            } else {
                if (page.isFrame()) {
                    //html transitional frames
                    writer.write("<!DOCTYPE html PUBLIC \"" +
                            "-//W3C//DTD HTML 4.01 Frameset//EN\" " +
                            "\"http://www.w3.org/TR/html4/frameset.dtd\">");
                } else {
                    //html transitional
                    writer.write("<!DOCTYPE html PUBLIC \"" +
                            "-//W3C//DTD HTML 4.01 Transitional//EN\" " +
                            "\"http://www.w3.org/TR/html4/loose.dtd\">");
                }
            }
            writer.write("\n");
        }
    }

    @Override
    public boolean getRendersChildren() {
        return false;
    }
}
