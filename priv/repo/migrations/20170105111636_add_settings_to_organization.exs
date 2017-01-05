defmodule Pomerol.Repo.Migrations.AddSettingsToOrganization do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      add :timezone, :string
      add :currency, :string
      add :datetime_format, :string
      add :currency_format, :string
    end
  end
end
