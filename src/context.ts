import { ProductController } from "./product/product.controller";
import { OrderController } from "./order/order.controller";
import { HandlerFactory } from "./common/handler/handler.factory";
import { ProductRepository } from "./product/product.repository";
import { OrderRepository } from "./order/order.repository";
import { HandlerInvoker } from "./common/handler/handler.invoker";

const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

const handlerFactory = new HandlerFactory(productRepository, orderRepository);
const handlerInvoker = new HandlerInvoker(handlerFactory);

const productController = new ProductController(handlerInvoker);
const orderController = new OrderController(handlerInvoker);

const controllers = [productController, orderController];

export const routers = controllers.map(controller => controller.router);
