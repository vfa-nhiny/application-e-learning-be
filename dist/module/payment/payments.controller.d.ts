import { PaymentsService } from "./payments.service";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    get(req: any, res: any): void;
    createPaymentUrl(req: any, res: any): any;
    vnPayIPN(req: any, res: any): void;
    vnPayReturn(req: any, res: any): void;
}
