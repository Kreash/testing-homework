import { ExampleApi } from "../../../src/client/api";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../../../src/common/types";
import { catalogMock } from "./catalog-mock";
import axios from 'axios';
import { productMock } from "./products-mock";
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

export class ExampleApiMock extends ExampleApi {
  constructor(private newBasename: string) {
    super(newBasename);
  }

  async getProducts(): Promise<any>
  {
    mockedAxios.get.mockResolvedValue({ data: catalogMock});
    return axios.get<ProductShortInfo[]>('')
  }

  async getProductById(id: number): Promise<any> {
    mockedAxios.get.mockResolvedValue({ data: productMock});
    return axios.get<Product>('')
  }

  async checkout(form: CheckoutFormData, cart: CartState): Promise<any> {
    mockedAxios.get.mockResolvedValue({ data: {id: 4}});
    return axios.get<Product>('')
  }
}
