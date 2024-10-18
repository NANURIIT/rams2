package com.nanuri.rams.business.assessment.tb90.tb9030;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9030B")
@RequiredArgsConstructor
@RestController
public class TB9030APIController {

    private final TB9030Service tb9030Service;

    // @PostMapping(value = "/select")
    // public int select(@RequestBody int data) {
    //     return tb9030Service.select(data);
    // }

    // @PostMapping(value = "/delete")
    // public int delete(@RequestBody int data) {
    //     return tb9030Service.delete(data);
    // }

    @PostMapping(value = "/insert")
    public int insert(@RequestBody IBIMS997BDTO param) {
        return tb9030Service.insert(param);
    }
}
