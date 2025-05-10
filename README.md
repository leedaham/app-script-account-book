# Google Apps Script 기반 가계부

## 개요

본 프로젝트는 Google Apps Script(GAS)를 활용하여 개인 가계부를 자동화한 시스템입니다. GAS를 통해 지출/소득을 입력하고, Google Sheets와 연동하여 통계 및 반복 지출 기능을 자동화합니다.


<img width="240" alt="Image" src="https://github.com/user-attachments/assets/6c0007bc-d928-4e4c-a219-ca787214b717" />

---

## 기능 구성

### 1. 지출/소득 입력

- Google Apps Script를 통해 사용자가 지출 또는 소득을 입력할 수 있음.
- 입력 형식:
  - 항목명
  - 날짜
  - 지출/소득
  - 결제수단(카드/통장 등)
  - 카테고리
  - 금액
  - 할인 여부
  - 메모

<img width="180" alt="input1" src="https://github.com/user-attachments/assets/7ea8b3dc-2da2-4040-875b-5cfdd39cea23" />
<img width="240" alt="input2" src="https://github.com/user-attachments/assets/15fda35c-81a6-411a-9fcb-2cac472531fd" />
<img width="240" alt="input3" src="https://github.com/user-attachments/assets/4a3e6eec-253e-40ee-8498-bbb3ada32cef" />
<img width="240" alt="input4" src="https://github.com/user-attachments/assets/5d66c5be-1676-4d5e-aeab-35715c3c5390" />

### 2. 데이터 저장

- 입력된 데이터는 Google Spreadsheet의 지정된 시트에 자동 저장됨.
  - 예: `dataSheet` 시트

### 3. 통계 생성

- Google Sheets의 `montly` 시트를 통해 월별 통계 계산
  - 월별 총 지출/소득
  - 항목별 카테고리 통계
  - 결제수단별 통계 등

### 4. 월별/일별 통계 확인

- 통계 시트에서 계산된 데이터를 Google Apps Script를 통해 다시 불러올 수 있음.
- GAS 내 대시보드 또는 간단한 UI로 출력 가능
- 월별 사용 금액, 일별 사용 금액 확인
- 최근 기입된 20건 내용 확인

<img width="240" alt="recent" src="https://github.com/user-attachments/assets/67628d71-2c68-40b4-8002-77330318c71f" />
<img width="240" alt="montly" src="https://github.com/user-attachments/assets/fa1b5df9-6178-46b9-a582-b8dc9df80427" />

### 5. 고정 지출 처리 (반복 실행)

- 매월 반복되는 지출은 `repeat` 시트에 설정
- GAS 스크립트가 매월 1일 자동으로 `repeat` 데이터를 읽어 `dataSheet` 시트에 추가

### 6. 참조 데이터 관리

- 카드, 통장 등 결제수단 목록은 `Reference` 시트에 저장
  - 드롭다운 또는 유효성 검사에 활용
  - 새로운 결제수단 추가 시 여기에서 관리

---

## 시트 구성 요약

| 시트 이름    | 용도 설명                        |
|-------------|---------------------------------|
| dataSheet | 모든 지출/소득 내역 저장             |
| montly   | 월별 계산된 통계 데이터             |
| daily   | 일별 기입 데이터             |
| repeat       | 매월 반복되는 고정 지출 항목 관리     |
| Reference    | 결제수단, 카테고리 등 참조 데이터 관리 |

<img width="1333" alt="dataSheet" src="https://github.com/user-attachments/assets/9ec03c9a-3b53-4299-93ed-934bf6791a60" />
<img width="977" alt="repeat" src="https://github.com/user-attachments/assets/985a7635-46cb-4798-8da3-3db70123185f" />
<img width="427" alt="Reference" src="https://github.com/user-attachments/assets/06518d7f-b9c3-4961-9485-6a73088a2508" />

---

## 사용 기술

- **Google Apps Script**
  - 사용자 입력 처리
  - 스프레드시트 데이터 입력 및 조회
  - 시간 기반 트리거로 고정 지출 자동 실행

- **Google Sheets**
  - 데이터 저장 및 통계 처리 (함수 사용)

---
