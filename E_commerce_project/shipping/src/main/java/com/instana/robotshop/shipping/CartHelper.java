package com.instana.robotshop.shipping;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CartHelper {
    private static final Logger logger = LoggerFactory.getLogger(CartHelper.class);

    private final String baseUrl;

    public CartHelper(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String addToCart(String id, String data) {
        logger.info("add shipping to cart {}", id);
        StringBuilder buffer = new StringBuilder();

        // Create a request config with timeout
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(5000)
                .setConnectionRequestTimeout(5000)
                .setSocketTimeout(5000)
                .build();

        // Build client with the config
        try (CloseableHttpClient httpClient = HttpClientBuilder.create().setDefaultRequestConfig(config).build()) {
            HttpPost postRequest = new HttpPost(baseUrl + id);
            StringEntity payload = new StringEntity(data);
            payload.setContentType("application/json");
            postRequest.setEntity(payload);

            try (CloseableHttpResponse res = httpClient.execute(postRequest)) {
                if (res.getStatusLine().getStatusCode() == 200) {
                    BufferedReader in = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
                    String line;
                    while ((line = in.readLine()) != null) {
                        buffer.append(line);
                    }
                } else {
                    logger.warn("Failed with code {}", res.getStatusLine().getStatusCode());
                }
            }
        } catch (Exception e) {
            logger.warn("http client exception", e);
        }

        return buffer.toString(); // will be empty on error
    }
}
