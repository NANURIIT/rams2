package com.nanuri.rams.business.assessment.tb07.tb07100;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS431BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS432BMapper;
import com.nanuri.rams.business.common.vo.IBIMS431BVO;
import com.nanuri.rams.business.common.vo.IBIMS432BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07100ServiceImpl implements TB07100Service {

	private final IBIMS431BMapper ibims431bMapper;
	private final IBIMS432BMapper ibims432bMapper;

	// 지급품의 기본 조회
	@Override
	public List<IBIMS431BVO> selectIBIMS431B(IBIMS431BVO param){
		return ibims431bMapper.selectIBIMS431B(param);
	};
	
	// 지급품의 상세 조회
	@Override
	public List<IBIMS432BVO> selectIBIMS432B(IBIMS432BVO param){
		return ibims432bMapper.selectIBIMS432B(param);
	};
	
	// 결재요청
	@Override
	public int apvlRqst(IBIMS431BVO param){
		return ibims431bMapper.apvlRqst(param);
	};

	// 지급품의 등록/변경
	@Override
	public int mergeIBIMS431B(IBIMS431BVO param){

		int result = 0;

		return ibims431bMapper.insertIBIMS431B(param);

	};

	// 기본 삭제
	@Override
	public int deleteIBIMS431B(IBIMS431BVO param){
		return ibims431bMapper.deleteIBIMS431B(param);
	};

	// 상세 삭제
	@Override
	public int deleteIBIMS432B(IBIMS432BVO param){
		return ibims432bMapper.deleteIBIMS432B(param);
	};
	
} // class end