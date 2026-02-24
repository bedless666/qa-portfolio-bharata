package com.example.tests;

import com.example.utilities.HttpClientHelper;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.IOException;

public class APITest {

    private final String baseUrl = "https://reqres.in/api";

    @Test
    public void testCasePositif() throws IOException {
        String url = baseUrl + "/users/2";
        String response = HttpClientHelper.sendGetRequest(url);
        Assert.assertTrue(response.contains("Janet"));
    }

    @Test
    public void testCaseNegatif() throws IOException {
        String url = baseUrl + "/users/23"; // Endpoint tidak valid
        String response = HttpClientHelper.sendGetRequest(url);
        Assert.assertEquals(response, "{}");
    }

    @Test
    public void testCaseBatas() throws IOException {
        String url = baseUrl + "/users?page=1"; // Halaman pertama
        String response = HttpClientHelper.sendGetRequest(url);
        Assert.assertTrue(response.contains("janet.weaver@reqres.in"));
    }
}
