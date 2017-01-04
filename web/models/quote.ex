defmodule Pomerol.Quote do
  use Pomerol.Web, :model

  @primary_key {:id, :binary_id, autogenerate: true}
  @derive {Phoenix.Param, key: :id}
  schema "quotes" do

    field :title, :string
    belongs_to :organization, Pomerol.Organization

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :organization_id])
    |> validate_required([:title, :organization_id])
  end
end
