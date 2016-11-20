defmodule Pomerol.User do
  use Pomerol.Web, :model
  import Pomerol.ValidationHelpers
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email]}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :locale, :string
    field :password, :string, virtual: true
    field :encrypted_password, :string

    timestamps
  end

  @required_fields ~w(first_name last_name email password locale)
  @optional_fields ~w(encrypted_password)

  @doc """
  Builds a changeset for registering the user.
  """
  def registration_changeset(user, params) do
    user
    |> cast(params, @required_fields, @optional_fields)
    |> update_change(:email, &String.downcase/1)
    |> validate_email_format(:email)
    |> unique_constraint(:email, message: "Email already taken")
    |> validate_length(:password, min: 5)
    |> validate_inclusion(:locale, ["en", "fr"])
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end

end
