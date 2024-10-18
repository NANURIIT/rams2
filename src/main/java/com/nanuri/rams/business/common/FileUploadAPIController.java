package com.nanuri.rams.business.common;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.nanuri.rams.business.common.dto.*;
import com.nanuri.rams.business.common.vo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nanuri.rams.com.dto.FileDTO;
import com.nanuri.rams.com.utils.FileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/FileUpload")
@RequiredArgsConstructor
@RestController
public class FileUploadAPIController {

	private final FileUploadService FileUploadervice;
	
	@Autowired
	private FileUtil fileUtils;
	
	
	
	//-----------------------TAB1 관리이력-----------------------//
	
	// 파일업로드
	@PostMapping(value = "/uploadCmFile")
	public FileUploadDTO uploadFile(
			  @RequestParam("uploadfile") MultipartFile uploadfile
			, @RequestParam(value = "fileKey1", required=false) String fileKey1
			, @RequestParam(value = "fileKey2", required=false) String fileKey2
			) {
		
				/*
				 * if(StringUtil.isNullOrEmpty(lstCCaseCcd)) { LocalDateTime today =
				 * LocalDateTime.now(); DateTimeFormatter date =
				 * DateTimeFormatter.ofPattern("yyMMddHHmmss"); ibDealNo = today.format(date); }
				 * if(StringUtil.isNullOrEmpty(riskInspctCcd)) { riskInspctCcd = "99"; }
				 * if(StringUtil.isNullOrEmpty(lstCCaseCcd)) { lstCCaseCcd = "99"; }
				 */
		
		FileDTO fileInfo = fileUtils.uploadFile(uploadfile);
		
		FileUploadDTO dto = new FileUploadDTO();
		dto.setFileKey1(fileKey1);
		dto.setFileKey2(fileKey2);
		dto.setSvFilePathNm(fileInfo.getServerPath());
		dto.setSvFileNm(fileInfo.getSaveName());
		String[] arrExpn = fileInfo.getOriginalName().split("\\.");
		log.debug(arrExpn.length+"") ;
		dto.setSvFileExpnsnNm(arrExpn[arrExpn.length-1]);
		dto.setSvFileSz(fileInfo.getSize());
		dto.setScrnMenuId(null);
		dto.setOrgFileNm(fileInfo.getOriginalName());
		//dto.setRgstDt(fileInfo.getRgstDt());
		dto.setScrnMenuId("AB01011S");

		FileUploadervice.registFileInfo(dto);
		
		return dto;
	}

	// 파일삭제
	@GetMapping(value = "/deleteCmFile")
	public List<FileUploadDTO> removeFile(
			  @RequestParam(value = "fileKey1", required=false) String fileKey1
			, @RequestParam(value = "fileKey2", required=false) String fileKey2
			,@RequestParam(value = "arrAttFileSq[]") List<Integer> arrAttFileSq
			) {
		log.debug("File delete Start!!! ==> " + arrAttFileSq.size());
		FileUploadVO vo = new FileUploadVO();
		vo.setFileKey1(fileKey1);
		vo.setFileKey2(fileKey2);
		vo.setArrAttFileSq(arrAttFileSq);

		
		List<FileUploadDTO> delFiles = FileUploadervice.getListFileInfo(vo);
		
		// 서버에 파일 삭제
		for(FileUploadDTO dto : delFiles) {
			FileUploadervice.deleteFileInfo(dto);
			FileUtil.deleteFile(dto.getSvFilePathNm(), dto.getSvFileNm());
		}
		
		vo.setArrAttFileSq(null);
		List<FileUploadDTO> list = FileUploadervice.getListFileInfo(vo);
		
		return list;
	}
	
	// 파일목록 조회
	@GetMapping(value = "/getCmFiles")
	public List<FileUploadDTO> getFileList(
			  @RequestParam(value = "fileKey1", required=false) String fileKey1
			, @RequestParam(value = "fileKey2", required=false) String fileKey2
			) {
		
		FileUploadVO vo = new FileUploadVO();
		vo.setFileKey1(fileKey1);
		vo.setFileKey2(fileKey2);
		
		List<FileUploadDTO> list = FileUploadervice.getListFileInfo(vo);
		
		return list;
	}
	
	// 파일다운로드
	@GetMapping(value = "/downloadFile")
	public void downloadFile(@RequestParam(value = "svFilePathNm") String svFilePathNm
			, @RequestParam(value = "svFileNm") String svFileNm
			, @RequestParam(value = "orgFileNm") String orgFileNm
			, HttpServletResponse response) {

		File file = new File(svFilePathNm, svFileNm);
		log.debug("File download  ==> " + file.toString());
		try {
			byte[] data = org.apache.commons.io.FileUtils.readFileToByteArray(file);
			response.setContentType("application/octet-stream");
			response.setContentLength(data.length);
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(orgFileNm, "UTF-8") + "\";");

			response.getOutputStream().write(data);
			response.getOutputStream().flush();
			response.getOutputStream().close();
			log.debug("File download is Success!! ==> " + data.length);
		} catch (IOException e) {
			throw new RuntimeException("파일 다운로드에 실패하였습니다.");

		} catch (Exception e) {
			throw new RuntimeException("시스템에 문제가 발생하였습니다.");
		}
		
	}
	
	
	
}
