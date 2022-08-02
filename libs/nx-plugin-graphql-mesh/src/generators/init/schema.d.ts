export interface InitSchema {
  e2eTestRunner?: 'cypress' | 'none';
  js?: boolean;
  skipFormat?: boolean;
  unitTestRunner?: 'jest' | 'none';
}
