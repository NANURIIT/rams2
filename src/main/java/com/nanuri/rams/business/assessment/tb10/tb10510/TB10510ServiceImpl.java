package com.nanuri.rams.business.assessment.tb10.tb10510;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS995BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS995BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.vo.IBIMS995BVO;
import com.nanuri.rams.business.common.vo.IBIMS997BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10510ServiceImpl implements TB10510Service {

	/* 배치JOB MASTER */
	private final IBIMS995BMapper ibims995bmp;

	/* 배치JOB 스케줄러 */
	private final IBIMS997BMapper ibims997bmp;

	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;

	// 배치 스케줄러 관리 조회
	@Override
	public IBIMS995BVO inqBatch(IBIMS995BDTO input) {
		IBIMS995BVO out995bvo = new IBIMS995BVO();
		
		String id = input.getJobId();
		String name = input.getJobName();

		log.debug("\nid ::::: {}", id);
		log.debug("\nname ::::: {}", name);
		List<IBIMS995BVO> ibims995bvo = ibims995bmp.selectIBIMS995B(input);
		
		out995bvo.setBatSch(ibims995bvo);

		return out995bvo;
	};

	// 배치 스케줄러 관리 등록
	@Override
    public int rgstBatch(IBIMS995BVO input) {
		int result = 0;
	
		// "M" Update else Insert
		String rowType = input.getRowType();

		// 현재 날짜 가져오기
        LocalDate currentDate = LocalDate.now();
        // 원하는 포맷 지정 (yyyyMMdd)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        // 포맷에 맞춰서 날짜를 문자열로 변환
        String formattedDate = currentDate.format(formatter);

		log.debug("rowType ::: {}" ,rowType);

		if ( "M".equals(rowType) ) {
			input.setLastUpdateDay(formattedDate);			 // 최종수정일
			input.setHndEmpno(facade.getDetails().getEno()); // 조작사원번호
			input.setHndTmnlNo("");			 	 // 조작단말기번호
			input.setHndTrId("");				     // 조작거래ID
			input.setGuid("");							 // GUID

			result = ibims995bmp.updateIBIMS995B(input);
		} else {
			input.setRegisterDay(formattedDate);			 // 최초등록일
			input.setLastUpdateDay(formattedDate);			 // 최종수정일
			input.setHndEmpno(facade.getDetails().getEno()); // 조작사원번호
			input.setHndTmnlNo("");			 	 // 조작단말기번호
			input.setHndTrId("");				     // 조작거래ID
			input.setGuid("");							 // GUID
	
			result = ibims995bmp.insertIBIMS995B(input);
		}
		
		return result;
	};

	// 배치 스케줄러 관리 실행
	@Override
	public int excBatch(IBIMS995BVO input) {
		int result = 0;
		List<IBIMS995BVO> excBat = input.getExcBat();

		// 현재 날짜와 시간 가져오기
        LocalDateTime currentDateTime = LocalDateTime.now();

        // 원하는 포맷 지정 (HH:mm:ss.SSS)
        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		// 원하는 포맷 지정 (yyyyMMdd)
        DateTimeFormatter dayFormat = DateTimeFormatter.ofPattern("yyyyMMdd");

        // 포맷에 맞춰서 시간만 문자열로 변환
        String formattedTime = currentDateTime.format(timeFormat);

        // 포맷에 맞춰서 날짜만 문자열로 변환
        String formattedDay = currentDateTime.format(dayFormat);

        // 결과 출력
        log.debug("\n 현재 시간 [{}]",formattedTime);

		String jobId = excBat.get(0).getJobId();
		String curDate = excBat.get(0).getCurDate();

		IBIMS997BVO in997bVo = new IBIMS997BVO();
		in997bVo.setCurDate(curDate);
		in997bVo.setJobId(jobId);
		int outSelect = ibims997bmp.count997(in997bVo);

		if ( outSelect > 0 ) {
			log.debug("타십니까?");
			result = 9;
			return result;
		}
		
		for (IBIMS995BVO in995bVo : excBat) {
			
			in997bVo.setCurDate(in995bVo.getCurDate());			// 영업일
			in997bVo.setJobId(in995bVo.getJobId());				// JOB ID
			in997bVo.setJobName(in995bVo.getJobName());		    // JOB NAME
			in997bVo.setJobType(in995bVo.getJobType());			// JOB TYPE
			in997bVo.setObjectName(in995bVo.getJobId());		// OBJECT NAME
			in997bVo.setArgument("");		// ARGUMENT
			// in997bVo.setPreJobCount(1);				// 업무프로그램에 전달될 CONFIRM JOB 건수
			in997bVo.setChildPid(00000);				// 업무프로그램의 PID
			in997bVo.setRunCount(0);					// 프로그램이 수행된 횟수 
			String confirmYn = in995bVo.getConfirmYn();
			if ( "0".equals(confirmYn)) {
				in997bVo.setConfirmJobCount(-1);
			} else if ("1".equals(confirmYn)) {
				in997bVo.setConfirmJobCount(1);
			}
			in997bVo.setFirstStartTime("");		 // 최초 기동시간
			in997bVo.setStartTime("");				 // 시작시간
			in997bVo.setEndTime("");					 // 종료시간
			in997bVo.setJobStatus("0");				 // 작업상태
			in997bVo.setHndEmpno(facade.getDetails().getEno());  // 조작사원번호
			in997bVo.setHndTmnlNo("");			 	 // 조작단말기번호
			in997bVo.setHndTrId("");				     // 조작거래ID
			in997bVo.setGuid("");							 // GUID

			result = ibims997bmp.insertIBIMS997B(in997bVo);
		}
		
		return result;
	}

	// 배치 스케줄러 관리 삭제
	public int delBatch(IBIMS995BVO input) {
		int result = 0;
		
		result = ibims995bmp.deleteIBIMS995B(input);

		return result;
	}
}
