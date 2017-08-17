package com.example.app;

import org.apache.coyote.http11.Http11NioProtocol;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;

import java.security.GeneralSecurityException;

/**
 * Created by vfilonenko on 07.07.2017.
 */
@SpringBootApplication
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class SpringBootApp extends SpringBootServletInitializer {

    @Value("${keystore.file}") Resource keystoreFile;
    @Value("${truststore.file}") Resource trustFile;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SpringBootApp.class);
    }

    public static void main(String[] args) throws GeneralSecurityException {
        SpringApplication.run(SpringBootApp.class, args);
    }

    @Bean
    EmbeddedServletContainerCustomizer containerCustomizer(
            @Value("${https.port}") final int port,
            @Value("${keystore.password}") final String keystorePass,
            @Value("${truststore.password}") final String truststorePass,
            @Value("${keystore.type}") final String keystoreType) throws Exception {
        final String absoluteKeystoreFile = keystoreFile.getFile().getAbsolutePath();
        final String absoluteTruststoreFile = trustFile.getFile().getAbsolutePath();
        return container -> {
            TomcatEmbeddedServletContainerFactory tomcat = (TomcatEmbeddedServletContainerFactory) container;
            tomcat.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> {
                connector.setPort(port);
                connector.setSecure(true);
                connector.setScheme("https");
                Http11NioProtocol proto = (Http11NioProtocol) connector.getProtocolHandler();
                proto.setSSLEnabled(true);
                proto.setKeystoreFile(absoluteKeystoreFile);
                proto.setKeystorePass(keystorePass);
                proto.setKeystoreType(keystoreType);
                proto.setTruststoreFile(absoluteTruststoreFile);
                proto.setTruststorePass(truststorePass);
            });
        };
    }
}
