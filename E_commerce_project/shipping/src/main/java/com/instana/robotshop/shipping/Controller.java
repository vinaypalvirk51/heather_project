package com.instana.robotshop.shipping;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);

    private final String CART_URL = String.format("http://%s/shipping/", getenv("CART_ENDPOINT", "cart"));

    public static List<byte[]> bytesGlobal = Collections.synchronizedList(new ArrayList<>());

    @Autowired
    private CityRepository cityrepo;

    @Autowired
    private CodeRepository coderepo;

    private String getenv(String key, String def) {
        String val = System.getenv(key);
        return val == null ? def : val;
    }

    @GetMapping(path = "/memory")
    public int memory() {
        byte[] bytes = new byte[1024 * 1024 * 25];
        Arrays.fill(bytes, (byte) 8);
        bytesGlobal.add(bytes);
        return bytesGlobal.size();
    }

    @GetMapping(path = "/free")
    public int free() {
        bytesGlobal.clear();
        return bytesGlobal.size();
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/count")
    public String count() {
        long count = cityrepo.count();
        return String.valueOf(count);
    }

    @GetMapping("/codes")
    public Iterable<Code> codes() {
        logger.info("all codes");
        return coderepo.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @GetMapping("/cities/{code}")
    public List<City> cities(@PathVariable String code) {
        logger.info("cities by code {}", code);
        return cityrepo.findByCode(code);
    }

    @GetMapping("/match/{code}/{text}")
    public List<City> match(@PathVariable String code, @PathVariable String text) {
        logger.info("match code {} text {}", code, text);

        if (text.length() < 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        List<City> cities = cityrepo.match(code, text);

        // Limit result size to 10
        if (cities.size() > 10) {
            cities = cities.subList(0, 10);
        }

        return cities;
    }

    @GetMapping("/calc/{id}")
    public Ship calc(@PathVariable long id) {
        double homeLatitude = 51.164896;
        double homeLongitude = 7.068792;

        logger.info("Calculation for {}", id);

        City city = cityrepo.findById(id);
        if (city == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "city not found");
        }

        Calculator calc = new Calculator(city);
        long distance = calc.getDistance(homeLatitude, homeLongitude);
        double cost = Math.rint(distance * 5) / 100.0;
        Ship ship = new Ship(distance, cost);

        logger.info("shipping {}", ship);
        return ship;
    }

    @PostMapping(path = "/confirm/{id}", consumes = "application/json", produces = "application/json")
    public String confirm(@PathVariable String id, @RequestBody String body) {
        logger.info("confirm id: {}", id);
        logger.info("body {}", body);

        CartHelper helper = new CartHelper(CART_URL);
        String cart = helper.addToCart(id, body);

        if (cart.equals("")) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "cart not found");
        }

        return cart;
    }
}
