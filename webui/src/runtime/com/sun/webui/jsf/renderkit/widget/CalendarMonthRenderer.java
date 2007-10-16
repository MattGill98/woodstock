/*
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
 * Copyright 2007 Sun Microsystems, Inc. All rights reserved.
 */

package com.sun.webui.jsf.renderkit.widget;

import com.sun.faces.annotation.Renderer;

import com.sun.webui.jsf.util.JavaScriptUtilities;
import com.sun.webui.jsf.component.CalendarMonth;
import com.sun.webui.jsf.component.DateManager;
import com.sun.webui.jsf.component.DropDown;
import com.sun.webui.jsf.component.Icon;
import com.sun.webui.jsf.model.Option;
import com.sun.webui.jsf.theme.ThemeImages;
import com.sun.webui.jsf.theme.ThemeTemplates;
import com.sun.webui.jsf.util.JSONUtilities;
import com.sun.webui.jsf.util.ThemeUtilities;
import com.sun.webui.jsf.util.WidgetUtilities;
import com.sun.webui.theme.Theme;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Renders a <code>CalendarMonth</code> component.
 * The calendar month is comprised of the following layout areas:
 * <ul>
 * <li>A header which displays today's date and an icon for closing the popup calnedar.</li>
 * <li>Calendar contorls which includes the year and month menus as well as the previous
 * and next icon hyperlinks.</li>
 * <li>Week days header</li>
 * <li>Table rows for days in the month.</li>
 * </ul>
 * 
 */
@Renderer(@Renderer.Renders(
    rendererType="com.sun.webui.jsf.widget.CalendarMonth",
    componentFamily="com.sun.webui.jsf.CalendarMonth"))
public class CalendarMonthRenderer extends RendererBase {
    /**
     * The set of pass-through attributes to be rendered.
     */
    private static final String stringAttributes[] = {        
        "style"
    };           

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // RendererBase methods
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    /** 
     * Helper method to obtain component properties.
     *
     * @param context FacesContext for the current request.
     * @param component UIComponent to be rendered.
     *
     * @exception IOException if an input/output error occurs
     * @exception JSONException if a key/value error occurs
     */
    protected JSONObject getProperties(FacesContext context,
            UIComponent component) throws IOException, JSONException {
	if (!(component instanceof CalendarMonth)) {
	    throw new IllegalArgumentException(
                "CalendarMonthRenderer can only render CalendarMonth components.");
        }             
        
        CalendarMonth calendarMonth = (CalendarMonth)component; 
        
        // Get a calendar instance with the correct timezone and locale 
        // from the CalendarMonth component. This calendar is initialized
        // with today's date.
        java.util.Calendar calendar = calendarMonth.getCalendar();               
        Theme theme = getTheme();        
        DateFormat df = SimpleDateFormat.getDateInstance(DateFormat.MEDIUM,
                context.getViewRoot().getLocale());
        df.setTimeZone((TimeZone)(calendarMonth.getTimeZone())); 
        
        // Get today's date.
        Date today = calendar.getTime(); 
        String[] param = {df.format(today)};
        String todayDateMsg = theme.getMessage("CalendarMonth.todayIs", param);                
        
        // Get first day of week, Sunday = 1, Monday = 2,...
        int firstDayOfWeek = calendar.getFirstDayOfWeek();
        JSONObject json = new JSONObject();           
        
        // Initialize children -- must be called after "today" and
        // "firstDayOfWeek" variables are set since "calendar"
        // is modified in initializeChildren().
        initializeChildren(calendarMonth, context, calendar, json);
        
        json.put("todayDateMsg", todayDateMsg)  
            .put("dateFormat", calendarMonth.getDateFormatPattern()) 
            .put("firstDayOfWeek", firstDayOfWeek);                  
                    
        // Add attributes.
        JSONUtilities.addStringProperties(stringAttributes, component, json);
        
        return json;
    }

    /**
     * Get the type of widget represented by this component.
     *
     * @param context FacesContext for the current request.
     * @param component UIComponent to be rendered.
     */
    protected String getWidgetType(FacesContext context, UIComponent component) {
        return JavaScriptUtilities.getModuleName("widget.calendar");
    }
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Private methods
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
             
    // Helper method to get themed icon.
    private Icon getIcon(Theme theme, String id, CalendarMonth parent, String key) {                
        Icon icon = ThemeUtilities.getIcon(theme, key);
        icon.setId(id);
        icon.setParent(parent);
        
        return icon;
    }
    
    /**
     * Initialize children (month and year menus).
     * 
     * Note that the "calendar" instance that is passed to this method gets modified.
     * If you are working with the same instance of "calendar" be cautious as to when
     * initializeChildren() should be called.
     */ 
    private void initializeChildren(CalendarMonth cm, FacesContext context, java.util.Calendar calendar,
            JSONObject json)
        throws IOException, JSONException{
        SimpleDateFormat dateFormat =
		(SimpleDateFormat)cm.getDateFormat();            
                           
        // Calculate which years should be displayed, based on the 
        // settings of the of the CalendarMonth component.
        // We should probably store these options as an attribute, 
        // instead of calculating them every time. 
        
        // Calculate min and max dates
        Date minDate = null; 
        Date maxDate = null;   
          
        UIComponent parent = cm.getParent(); 
        if(parent instanceof DateManager) {
            minDate = ((DateManager)parent).getFirstAvailableDate();
            maxDate = ((DateManager)parent).getLastAvailableDate();
        }   
               
        // Calculate the years to show on the menu.
        calendar.setTime(minDate);
        int firstYear = calendar.get(Calendar.YEAR);  
        calendar.setTime(maxDate); 
        int lastYear = calendar.get(Calendar.YEAR);  
        
        int numYears = lastYear - firstYear + 1;
        Integer yearInteger = null;
        Option[] yearOptions = new Option[numYears];
        
        for(int i=0; i < numYears; ++i) {
            yearInteger = new Integer(firstYear + i);
            yearOptions[i] = new Option(yearInteger, yearInteger.toString());
        }
        
        Theme theme = getTheme();        
        
        DropDown yMenu = (DropDown)cm.getFacet(cm.YEAR_MENU_ID);  
        if (yMenu != null) {
            yMenu.setToolTip(theme.getMessage("CalendarMonth.selectYear"));
            json.put("yearMenu", WidgetUtilities.renderComponent(context, yMenu));                    
        } else {        
            //Render the options as JSON Array. 
            // This will be used in populating the drop down that is created on the
            // client side.
            JSONArray yearObject = WidgetUtilities.getOptions(context, cm, yearOptions);
            json.put("yearMenu", yearObject);
        }
        
        // Set the items of the month component
        // construct an option[] for the locale specific months       
        String[] monthNames = dateFormat.getDateFormatSymbols().getMonths();
        Option[] months = new Option[12];
   
        calendar.set(Calendar.MONTH, Calendar.JANUARY);
        int monthInt;
        
        for (int i = 0; i < 12; i++) {
            monthInt = calendar.get(Calendar.MONTH);
            months[i] = new Option(new Integer(monthInt+1), monthNames[i]);
            calendar.add(Calendar.MONTH, 1);
        }        
                       
        DropDown mMenu = (DropDown)cm.getFacet(cm.MONTH_MENU_ID);       
        if (mMenu != null) {
            mMenu.setToolTip(theme.getMessage("CalendarMonth.selectMonth"));
            json.put("monthMenu", WidgetUtilities.renderComponent(context, mMenu));
        } else {
                
            //Render the options as JSON Array. 
            // This will be used in populating the drop down that is created on the
            // client side.        
            JSONArray monthObject = WidgetUtilities.getOptions(context, cm, months);
            json.put("monthMenu", monthObject);
        }
    }
}
