import { Category, OrderStatus, CardPayment } from "./type";
import { ProductItem } from "./Product";
import { Cart } from "./Cart";
import { OrderProcessor } from "./Order";
import { Repository } from "./Repository";
import { OrderEventEmitter } from "./event";
import { fetchProductsAsync, processOrderAsync } from "./api";

async function main() {
    console.log("=== 🛒 타입스크립트 고도화 쇼핑몰 백엔드 구동 시작 ===");

    // 1. 템플릿 리터럴 기반 이벤트 시스템 생성 및 리스너 구독
    const emitter = new OrderEventEmitter();
    emitter.on((event, orderId) => {
        console.log(`🔔 [이벤트 감지 알림] ${event} (주문 번호: #${orderId})`);
    });

    // 2. 비동기 상품 목록 서버 조회 시뮬레이션 (Promise + setTimeout 1초)
    console.log("\n📡 [API 요청] 서버에서 상품 목록을 불러오는 중... (1초 소요)");
    const response = await fetchProductsAsync();

    if (!response.success || !response.data) {
        console.error("❌ 상품 목록을 불러오지 못했습니다.");
        return;
    }

    // 3. 제네릭 만능 저장소(Repository<ProductItem>)에 상품 보관
    const productRepo = new Repository<ProductItem>();
    response.data.forEach(item => productRepo.saveItem(item));
    console.log(`📦 [저장소 보관 완료] 총 ${productRepo.findAll().length}개의 상품이 DB에 저장되었습니다.`);

    // 4. DTO(ProductUpdateInput) 및 유틸리티 타입으로 상품 가격 할인가 수정
    const laptop = productRepo.findById(1);
    if (laptop) {
        console.log(`\nBEFORE 수정 전: ${laptop.getInfo()}`);
        // Partial<Omit<Product, "id">> DTO 활용! id 제외 선택적 수정
        laptop.update({ price: 850000 });
        console.log(`AFTER  수정 후: ${laptop.getInfo()} (특가 할인 적용!)`);
    }

    // 5. 장바구니에 상품 담기 및 총 금액 계산
    const cart = new Cart();
    if (laptop) cart.addItem(laptop, 1);

    const tshirt = productRepo.findById(2);
    if (tshirt) cart.addItem(tshirt, 2);

    console.log(`\n🛒 장바구니 총 금액: ${cart.getTotalPrice().toLocaleString()}원`);

    // 6. Discriminated Union 결제 정보 및 주문 생성
    const payment: CardPayment = {
        tag: "CARD",
        cardNumber: "9876-5432-1098-7654",
        installment: 3
    };

    const processor = new OrderProcessor();
    const order = processor.createOrder(2026, cart.getItems(), payment);

    // 7. 비동기 결제 실행 및 결과 수신
    console.log("\n💳 [비동기 결제 시도 중...]");
    const orderResult = await processOrderAsync(order);

    if (orderResult.success && orderResult.data) {
        // switch + never 안전장치로 결제 처리 메시지 생성
        const paymentMsg = processor.processPayment(orderResult.data.payment);
        console.log(`✅ ${paymentMsg}`);

        // 주문 상태 변경 (PENDING ➔ PAID)
        processor.updateStatus(orderResult.data, OrderStatus.PAID);
        console.log(`📌 주문 #${orderResult.data.id} 상태 변경: ${OrderStatus[orderResult.data.status]}`);

        // 8. 템플릿 리터럴 기반 이벤트 발송! ("on_PAID_order")
        emitter.emit(orderResult.data.status, orderResult.data.id);
    }

    console.log("\n=== 🎉 쇼핑몰 서비스 전체 시나리오 실행 종료 ===");
}

main().catch(console.error);