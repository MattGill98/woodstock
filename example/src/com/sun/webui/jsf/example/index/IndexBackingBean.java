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

package com.sun.webui.jsf.example.index;

import com.sun.webui.jsf.example.index.TableData;
import com.sun.webui.jsf.example.index.AppData;
import com.sun.webui.jsf.example.common.MessageUtil;

import com.sun.webui.jsf.component.Hyperlink;
import com.sun.webui.jsf.component.TableColumn;
import com.sun.webui.jsf.component.Markup;

import com.sun.data.provider.TableDataProvider;
import com.sun.data.provider.impl.ObjectArrayDataProvider;

import javax.faces.context.FacesContext;
import javax.faces.component.UIComponent;
import javax.faces.component.UIParameter;

import java.util.ArrayList;
import java.io.Serializable;

import com.sun.webui.jsf.example.util.ExampleUtilities;


/**
 * This bean class provides data to the index page table
 * in the example app.
 */
public class IndexBackingBean implements Serializable {
    
    // Hyperlink id
    private static final String HYPERLINK_ID = "link";
    
    // The outcome strings used in the faces config file
    private static final String SHOWCODE_ACTION = "showCode";
    public static final String INDEX_ACTION = "showIndex";
    
    // TableColumn component.
    private TableColumn tableColumn = null; 
    
    // Table data
    private TableData tableData = null; 
    
    // Table provider
    private TableDataProvider provider = null;
    
    /** Default constructor. */
    public IndexBackingBean() {           
        tableData = new TableData(); 
    }        
    
    /**
     * Get table data provider
     */
    public TableDataProvider getDataProvider() {
        if (provider == null) {
            provider = new ObjectArrayDataProvider(getTableData());
        }        
        return provider;
    }  
    
    /**
     * Get table data
     */
    public AppData[] getTableData() {               
        return tableData.data;        
    }
      
    /**
     * Get tableColumn component
     */
    public TableColumn getTableColumn() {        
        if (tableColumn == null) {
            String id; 
            int maxLinks = 0;
            int numFiles = 0;
            
            // create tableColumn
            tableColumn = createTableColumn("col3", "index_filesHeader");                                                                                                             
            
            // Find the maximum number of hyperlinks that should be created
            // by counting the number of files in the AppData array object. 
            AppData[] tableData = getTableData();                        
            for (int k = 0; k < tableData.length; k++) {
                 numFiles = tableData[k].getFiles().length;
                 if (numFiles > maxLinks) {
                     maxLinks = numFiles;
                 }
            }
                                               
            // Create hyperlinks up to the maximum number of files
            // in the AppData object. Use the "rendered" attribute 
            // of the hyperlink component to hide it if there are
            // less links to show.
            if (maxLinks > 0) {                    
                for (int i = 0; i < maxLinks; i++) {                
                    id = HYPERLINK_ID + "_" + i;               
                    
                    // Create hyperlinks for each file in an example app
                    // to show the source code
                    Hyperlink hyperlink = createHyperlink(id,
                            "#{data.value.files["+ i + "]}",
                            "#{IndexBean.action}",
                            "#{data.value.files[" + i + "]}");  
                    
                    // The hyperlink is an ActionSource component                    
                    // which should be marked immediate by default. 
                    hyperlink.setImmediate(true);
                    
                    // Don't display the link if no file name exists.
                    ExampleUtilities.setValueExpression(hyperlink, "rendered",
                            "#{data.value.files["+ i + "] != null}");                                                 
                    
                    // Add new lines between the hyperlinks.                    
                    Markup markup = createMarkup("br", true);                    
                    ExampleUtilities.setValueExpression(markup, "rendered",
                            "#{data.value.files["+ i + "] != null}");                    
                    
                    tableColumn.getChildren().add(hyperlink);
                    tableColumn.getChildren().add(markup);            
                }
            }
        }        
        return tableColumn;
    }
    
    /**
     * Set tableColumn component.
     *
     * @param tableColumn The TableColumn component
     */
    public void setTableColumn(TableColumn tableColumn) {
        this.tableColumn = tableColumn;
    }

    /** 
     * Return the string used for hyperlink action.
     */
    public String action() {
        return new String(SHOWCODE_ACTION);       
    }
    
    /**
     * Return the string used for breadcrumbs action.
     */
    public String showIndex() {
        return new String(INDEX_ACTION);
    }
        
    /**
     * Helper method to create table column
     *    
     * @param id The component id.
     * @param header The component header text.
     */
    private TableColumn createTableColumn(String id, String header) {
        TableColumn col = new TableColumn();        
        col.setId(id);
        col.setHeaderText(MessageUtil.getMessage(header));        
        return col;        
    }  
    
    /**
     * Helper method to create hyperlink.
     *
     * @param id The component id.
     * @param text Value binding expression for text.
     * @param action Method binding expression for action.
     * @param parameter Value binding expression for parameter.
     */
    private Hyperlink createHyperlink(String id, String text, String action,
            String parameter) {
        // Get hyperlink.
        Hyperlink hyperlink = new Hyperlink();
        hyperlink.setId(id); // Set id.
        ExampleUtilities.setValueExpression(hyperlink,
		"text", text); // Set text.
        ExampleUtilities.setMethodExpression(hyperlink,
		"actionExpression", action); // Set action.

        // Create paramerter.
        UIParameter param = new UIParameter();
        param.setId(id + "_param");
        param.setName("param");
        ExampleUtilities.setValueExpression(param,
		"value", parameter); // Set parameter.
        hyperlink.getChildren().add(param);

        return hyperlink;
    }
       
    /**
     * Helper method to create markup
     */
    private Markup createMarkup(String tag, boolean singleton) {
        // Get markup.
        Markup markup = new Markup();
        markup.setTag(tag);
        markup.setSingleton(singleton);        
        return markup;
    }
    
}
