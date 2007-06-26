package com.sun.webui.tools;

import com.sun.webui.tools.javascript.CompressJS;
import com.sun.webui.tools.javascript.EmbedTemplates;

import java.io.*;

/**
 * Main class to invoke build tools.
 */
public class Main {
    /**
     * Helper function to invoke compression tool.
     *
     * @param args 
     */
    public static void compressJS(String[] args) throws IOException {
        String sourcePath = null;
        String rhinoJar = null;
        boolean verbose = false;

        // Parse arguments.
        for (int i = 1; i < args.length; i++) {
            if (args[i].equals("-verbose")) {
                verbose = true;
            } else if (i + 1 < args.length) {
                if (args[i].equals("-sourcePath")) {
                    sourcePath = args[++i];
                } else if (args[i].equals("-rhinoJar")) {
                    rhinoJar = args[++i];
                }
            }
	}

        if (sourcePath != null && rhinoJar != null) {
            CompressJS cjs = new CompressJS(rhinoJar, verbose);
            cjs.compress(sourcePath);
        } else {
            usage();
        }
    }

    /**
     * Helper function to invoke embed tool.
     *
     * @param args 
     */
    public static void embedTemplates(String[] args) {
        usage();
    }

    /**
     * Helper function to show usage.
     *
     * @param args 
     */
    public static void usage() {
        System.out.println("java -jar jarFile <args...>");

        System.out.println("\nwhere options include:");
        System.out.println("-compressJS <args...>\t\tCompress JavaScript.");
        System.out.println("-embedTemplates <args...>\tEmbed HTML templates in JavaScript.");

        System.out.println("\nOptions for -compressJS include:");
        System.out.println("-rhinoJar\tJar file containing the Rhino compression tool.");
        System.out.println("-sourcePath\tJavaScript directory or file to compress.");
        System.out.println("-verbose\tEnable verbose output.");

        System.out.println("\nOptions for -embedTemplates include:");
        System.out.println("-sourcePath\tPath to HTML template directory or file.");
        System.out.println("-destPath\tPath to JavaScript directory or file.");
        System.out.println("-verbose\tEnable verbose output.");
    }

    /**
     * Parse arguments and invoke tools.
     *
     * @param args 
     */
    public static void main(String[] args) throws IOException {
        if (args.length > 0) {
            if (args[0].equals("-compressJS")) {
                compressJS(args);
            } else if (args[0].equals("-embedTemplates")) { 
                embedTemplates(args);
            } else {
                usage();
            }
        } else {
            usage();
        }
    }
}