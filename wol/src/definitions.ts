export interface wolPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
