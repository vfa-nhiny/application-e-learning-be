import { PaymentsService } from "./payments.service";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentUrl(req: any, res: any): any;
    vnPayIPN(req: any, res: any): void;
    vnPayReturn(req: any, res: any): {
        url: string;
        statusCode: number;
    };
}
